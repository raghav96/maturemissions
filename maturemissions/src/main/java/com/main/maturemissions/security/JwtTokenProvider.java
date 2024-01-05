package com.main.maturemissions.security;

import com.main.maturemissions.exception.AuthorizerException;
import com.main.maturemissions.model.AppUserRole;
import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserPermissions;
import com.main.maturemissions.repository.UserPermissionsRepository;
import com.main.maturemissions.repository.UsersRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * This class generates jwt tokens
 */
@Component
public class JwtTokenProvider {
    @Value("${security.jwt.token.secret-key:8Z2Q7LzKF4i4EMQO1mpyxPLNTKsMHWXJjYkry78TebXo27HfeNyvVdsR7ddJ5LBCrCEo5NwIJM7XcpWBqpNN5zFz12872XE4dMYSA9aXLtY9GofB22CQ8ioxdnK7qQplDCYLu8Kq7UYu4TJ62gPjW3t0kWX0t6xLIA162kEBO5r7zDjGNDnDb2M7q5lZISKAK1uMb42pHUKXwZnaSxESF9zfUr5cVgztTroE4jlxWBoqaXDbxJatS8hR4mj8iTLr}")
    private String secretKey;

    @Value("${security.jwt.token.expire-length:3600000}")
    private long validityInMilliseconds = 999999999; // 1h

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserPermissionsRepository userPermissionsService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String username, List<AppUserRole> appUserRoles) {

        Claims claims = Jwts.claims().setSubject(username);
        claims.put("auth", appUserRoles.stream().map(s -> new SimpleGrantedAuthority(s.getAuthority()).toString()).collect(Collectors.toList()));

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);


        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

        return Jwts.builder()//
                .setClaims(claims)//
                .setIssuedAt(now)//
                .setExpiration(validity)//
                .signWith(key)//
                .compact();
    }

    public Authentication getAuthentication(String token) {
        User userDetails = usersRepository.findByUsername(getUsername(token));
        UserPermissions userPermissions = userPermissionsService.findByUserId(userDetails.getId());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userPermissions.getAppUserRoles());
    }

    public String getUsername(String token) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean validateToken(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            throw new AuthorizerException("Expired or invalid JWT token", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
