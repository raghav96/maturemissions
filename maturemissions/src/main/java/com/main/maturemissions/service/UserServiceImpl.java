package com.main.maturemissions.service;

import com.google.gson.Gson;
import com.main.maturemissions.exception.AuthorizerException;
import com.main.maturemissions.model.AppUserRole;
import com.main.maturemissions.model.Provider;
import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserPermissions;
import com.main.maturemissions.model.pojo.LoginUserDTO;
import com.main.maturemissions.model.pojo.UserListDTO;
import com.main.maturemissions.repository.*;
import com.main.maturemissions.security.JwtTokenProvider;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Service class for managing user-related operations.
 * This service provides methods for user authentication, registration, profile updates, and deletion.
 */
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UsersRepository userRepository;
    @Autowired
    private UserPermissionsRepository userPermissionsRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private ServiceRequestsRepository serviceRequestsRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    /**
     * Constructor for UserServiceImpl.
     *
     * @param passwordEncoder         the password encoder.
     * @param jwtTokenProvider        the JWT token provider.
     * @param authenticationManager   the authentication manager.
     */
    public UserServiceImpl(PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Logs in a user.
     *
     * @param username the username.
     * @param password the password.
     * @return a JSON string representing the logged-in user.
     * @throws AuthorizerException if there is an authentication error.
     */
    public String login(String username, String password) throws AuthorizerException{
        try {
            User user = getUserByUsername(username);
            UserPermissions userPermissions = userPermissionsRepository.findByUserId(user.getId());
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            String jwtToken = jwtTokenProvider.createToken(username, userPermissions.getAppUserRoles());
            String role = userPermissions.getAppUserRoles().get(0).getAuthority();
            LoginUserDTO loginUserDTO = new LoginUserDTO(user.getId().toString(), username, jwtToken, role);
            return new Gson().toJson(loginUserDTO);
        } catch (AuthenticationException e) {
            e.printStackTrace();
            throw new AuthorizerException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    public void setUserRepository(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void setUserPermissionsRepository(UserPermissionsRepository userPermissionsRepository) {
        this.userPermissionsRepository = userPermissionsRepository;
    }

    /**
     * Changes details of a user based on the provided parameters.
     *
     * @param id                    the id of the user.
     * @param name                  the new name.
     * // other parameters
     * @return a string indicating the success of the operation.
     */
    @Override
    public String changeUserDetails(Long id, String name, Integer age, Integer phoneNumber, String email, Long medicareNumber, String address, String username, Boolean emailNotifications, Boolean smsNotifications, String imageLoc, String type, Boolean active) {
        User user = getUserById(id);
        switch (type) {
            case "EMAIL" -> user.setEmailNotifications(emailNotifications);
            case "SMS" -> user.setSmsNotifications(smsNotifications);
            case "IMAGE" -> user.setImageLoc(imageLoc);
            case "ADDRESS" -> user.setAddress(address);
            case "USER" -> {
                user.setName(name);
                user.setUsername(username);
                user.setAge(age);
                user.setPhoneNumber(phoneNumber);
                user.setEmail(email);
                user.setMedicareNumber(medicareNumber);
            }
            case "PROVIDER" -> {
                user.setName(name);
                user.setUsername(username);
                user.setAge(age);
                user.setPhoneNumber(phoneNumber);
                user.setEmail(email);
            }
            case "STATUS" -> {
                user.setActive(active);
            }
        }
        userRepository.save(user);
        return "successfully changed user details!";
    }

    /**
     * Signs up a new user.
     *
     * @param appUser the user details.
     * @param role    the role of the user.
     * @return a JSON string representing the registered user.
     * @throws AuthorizerException if the username is already in use.
     */
    public String signup(User appUser, AppUserRole role) throws AuthorizerException {
        if (getUserByUsername(appUser.getUsername()) == null) {
            appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
            saveUser(appUser);
            UserPermissions userPermissions = null;
            if (role.equals(AppUserRole.ROLE_ADMIN)) {
                userPermissions = new UserPermissions(appUser, new ArrayList<AppUserRole>(List.of(AppUserRole.ROLE_ADMIN)));
                System.out.println(userPermissions.getAppUserRoles());
                userPermissionsRepository.save(userPermissions);
            } else if (role.equals(AppUserRole.ROLE_USER)){
                userPermissions = new UserPermissions(appUser, new ArrayList<AppUserRole>(List.of(AppUserRole.ROLE_USER)));
                userPermissionsRepository.save(userPermissions);
            } else {
                userPermissions = new UserPermissions(appUser, new ArrayList<AppUserRole>(List.of(AppUserRole.ROLE_PROVIDER)));
                userPermissionsRepository.save(userPermissions);
                 Provider provider = new Provider();
                 provider.setUser(appUser);
                 provider.setDetails("");
                 provider.setRating(0.0);
                 providerRepository.save(provider);
            }

            String jwtToken = jwtTokenProvider.createToken(appUser.getUsername(), userPermissions.getAppUserRoles());
            String roleString = role.getAuthority();
            LoginUserDTO loginUserDTO = new LoginUserDTO(appUser.getId().toString(), appUser.getUsername(), jwtToken, roleString);
            return new Gson().toJson(loginUserDTO);
        } else {
            throw new AuthorizerException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Retrieves the provider information for a given user.
     *
     * @param user The user for whom the provider information is to be retrieved.
     * @return A {@code Provider} object representing the provider information for the user, or null if the user is not a provider.
     */
    public Provider getProviderForUser(User user) {
        UserPermissions userPermissions = userPermissionsRepository.findByUserId(user.getId());
        if (userPermissions.getAppUserRoles().get(0).equals(AppUserRole.ROLE_PROVIDER)) {
            return providerRepository.getProviderByUser(user);
        }
        return null;
    }

    public void delete(String username) {
        userRepository.deleteByUsername(username);
    }

    public User search(String username) {
        User appUser = userRepository.findByUsername(username);
        if (appUser == null) {
            throw new AuthorizerException("The user doesn't exist", HttpStatus.NOT_FOUND);
        }
        return appUser;
    }

    public User whoami(HttpServletRequest req) {
        return userRepository.findByUsername(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
    }

    public String refresh(String username) {
        User user = userRepository.findByUsername(username);
        UserPermissions userPermissions = userPermissionsRepository.findByUserId(user.getId());
        return jwtTokenProvider.createToken(username, userPermissions.getAppUserRoles());
    }

    /**
     * Saves a user to the repository.
     *
     * @param user The user to save.
     * @return The saved {@code User} object.
     */
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Retrieves a list of all users.
     *
     * @return A list of all {@code User} objects.
     */
    @Override
    public List<User> getUserList() {
        return (List<User>) userRepository.findAll();
    }

    /**
     * Retrieves all users and returns their information as a JSON string.
     *
     * @return A JSON string representing a list of all users.
     */
    public String getAllUsers() {
        List<User> users = getUserList();
        UserListDTO userListDTO = new UserListDTO(users);
        return new Gson().toJson(userListDTO);
    }

    /**
     * Retrieves a user by their username.
     *
     * @param username the username.
     * @return the User object, or null if not found.
     */
    public User getUserByUsername(String username) {
        List<User> userList = getUserList();
        for (User user: userList) {
            if (user.getUsername().equalsIgnoreCase(username)) {
                return user;
            }
        }
        return null;
    }

    /**
     * Retrieves a user by their id.
     *
     * @param id the id of the user.
     * @return the User object.
     * @throws AuthorizerException if the user doesn't exist.
     */
    @Override
    public User getUserById(Long id) {
        User selectedUser = null;
        List<User> userList = getUserList();
        for (User user: userList) {
            if (user.getId().equals(id)) {
                return user;
            }
        }
        throw new AuthorizerException("The user doesn't exist", HttpStatus.NOT_FOUND);
    }

    public List<String> getUsernameList() {
        List<String> usernameList = new ArrayList<String>();
        userRepository.findAll().forEach((user) -> {
            usernameList.add(user.getUsername());
        });
        return usernameList;
    }

    /**
     * Updates a user's details.
     *
     * @param user   the new user details.
     * @param userId the id of the user to update.
     * @return the updated User object.
     */
    @Override
    public User updateUser(User user, Long userId) {
        User userEntry = (userRepository.findById(userId).isPresent() ? userRepository.findById(userId).get() : new User());

        if (Objects.nonNull(user.getAddress()) && StringUtils.isNotEmpty(user.getAddress())) {
            userEntry.setAddress(user.getAddress());
        }

        if (Objects.nonNull(user.getName()) && StringUtils.isNotEmpty(user.getName())) {
            userEntry.setName(user.getName());
        }

        if (user.isActive()) {
            userEntry.setActive(true);
        }

        if (Objects.nonNull(user.getAge())) {
            userEntry.setAge(user.getAge());
        }

        if (Objects.nonNull(user.getPhoneNumber())) {
            userEntry.setPhoneNumber(user.getPhoneNumber());
        }

        if (Objects.nonNull(user.getEmail()) && StringUtils.isNotEmpty(user.getEmail())) {
            userEntry.setEmail(user.getEmail());
        }

        if (Objects.nonNull(user.getMedicareNumber())) {
            userEntry.setMedicareNumber(user.getMedicareNumber());
        }

        if (Objects.nonNull(user.getUsername()) && StringUtils.isNotEmpty(user.getUsername())) {
            userEntry.setUsername(user.getUsername());
        }

        if (Objects.nonNull(user.getPassword()) && StringUtils.isNotEmpty(user.getPassword())) {
            userEntry.setPassword(user.getPassword());
        }

        return userRepository.save(userEntry);
    }

    /**
     * Deletes a user.
     *
     * @param user the user to delete.
     */
    @Override
    public void deleteUser(User user) {
        userPermissionsRepository.deleteUserPermissionsByUser(user);
        providerRepository.deleteProviderByUser(user);
        serviceRequestsRepository.deleteServiceRequestsByUser(user);
        userRepository.deleteById(user.getId());
    }

}
