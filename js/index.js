$(document).ready(function() {
        // Function to center modal
        function centerModal() {
            $('.modal').each(function() {
                var modal = $(this);
                var modalContent = modal.find('.modal-content');

                // Reset any previous positioning
                modalContent.css({
                    'margin-top': '',
                    'top': '50%',
                    'transform': 'translateY(-50%) scale(0.95)'
                });

                // If content is taller than viewport, position at top with margin
                if (modalContent.outerHeight() > $(window).height() - 40) {
                    modalContent.css({
                        'top': '20px',
                        'transform': 'none',
                        'margin-top': '0',
                        'margin-bottom': '20px'
                    });
                }
            });
        }

        // Center modals on load and resize
        $(window).on('resize', centerModal);

        // Switch between login and signup modals
        $("#switchToSignup").click(function(e) {
            e.preventDefault();
            $("#loginModal").removeClass("active").fadeOut();
            $("#signupModal").addClass("active").fadeIn();
            centerModal();
        });

        $("#switchToLogin").click(function(e) {
            e.preventDefault();
            $("#signupModal").removeClass("active").fadeOut();
            $("#loginModal").addClass("active").fadeIn();
            centerModal();
        });

        // Open Login Modal
        $("#loginBtn, #heroLoginBtn").click(function() {
            $("#loginModal").addClass("active").fadeIn();
            $("body").css("overflow", "hidden");
            centerModal();
        });

        // Open Signup Modal
        $("#signupBtn, #heroSignupBtn").click(function() {
            $("#signupModal").addClass("active").fadeIn();
            $("body").css("overflow", "hidden");
            centerModal();
        });

        // Close Modals
        $(".close").click(function() {
            $(".modal").removeClass("active").fadeOut();
            $("body").css("overflow", "auto");
        });

        // Close modal when clicking outside
        $(window).click(function(event) {
            if ($(event.target).hasClass("modal")) {
                $(".modal").removeClass("active").fadeOut();
                $("body").css("overflow", "auto");
            }
        });

        // File upload label
        $("#fileUploadLabel").click(function() {
            $("#profilePhoto").click();
        });

        $("#profilePhoto").change(function() {
            const fileName = $(this).val().split("\\").pop();
            $("#fileName").text(fileName || "No file chosen");

            // Preview image if selected
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    $("#imagePreview").html(`<img src="${e.target.result}" style="max-width: 100px; max-height: 100px; border-radius: 5px; margin-top: 10px;">`);
                }
                reader.readAsDataURL(file);
            }
        });

        // Enhanced register function with better error handling
async function registerUser(registerData, token = null) {
    try {
        // Prepare headers
        const headers = {
            'Content-Type': 'application/json',
        };
        
        // Add Authorization header if token is provided
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(registerData)
        });

        let result;
        const responseText = await response.text();
        
        try {
            result = responseText ? JSON.parse(responseText) : {};
        } catch (jsonError) {
            result = { 
                message: responseText || 'No response body',
                status: response.status
            };
        }

        if (response.ok) {
            return {
                success: true,
                data: result,
                status: response.status
            };
        } else {
            return {
                success: false,
                error: result.message || `Registration failed with status ${response.status}`,
                status: response.status,
                details: result
            };
        }
    } catch (error) {
        console.error('Network error:', error);
        return {
            success: false,
            error: 'Network error: ' + error.message
        };
    }
}

// Usage example with enhanced response handling
async function handleRegistration() {
    const registerData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'USER'
    };

    const result = await registerUser(registerData);
    
    if (result.success) {
        console.log('✅ Registration successful:', result.data);
        // Handle success
    } else {
        console.log('❌ Registration failed:', result.error);
        console.log('Status:', result.status);
        console.log('Details:', result.details);
        // Handle error
    }
}

        // Login function using Fetch - Updated to store user data
        async function loginUser(authData) {
            try {
                const response = await fetch('http://localhost:8080/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(authData)
                });

                const result = await response.json();

                if (response.ok) {
                    // Store the token
                    localStorage.setItem('token', result.data.accessToken);

                    // Get user profile data
                    const profileResponse = await fetch('http://localhost:8080/auth/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${result.data.accessToken}`
                        }
                    });

                    const profileResult = await profileResponse.json();
                    if (profileResponse.ok) {
                        localStorage.setItem('user', JSON.stringify(profileResult.data));
                    }

                    return result;
                } else {
                    throw new Error(result.message || 'Login failed');
                }
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        }

        // Logout function using Fetch
        async function logoutUser() {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('http://localhost:8080/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    // Clear stored data
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    return result;
                } else {
                    throw new Error(result.message || 'Logout failed');
                }
            } catch (error) {
                console.error('Logout error:', error);
                throw error;
            }
        }

        // Function to get stored token
        function getToken() {
            return localStorage.getItem('token');
        }

        // Function to check if user is logged in
        function isLoggedIn() {
            return !!localStorage.getItem('token');
        }

        // Function to get user data
        function getUser() {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        }

        // Function to add authorization header to requests
        function getAuthHeaders() {
            const token = getToken();
            return {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
        }

        // Function to redirect based on user role
        function redirectBasedOnRole() {
            const user = getUser();
            if (user) {
                switch(user.role) {
                    case 'ADMIN':
                        window.location.href = "/pages/adminDashboard.html";
                        break;
                    case 'USER':
                        window.location.href = "/pages/userDashboard.html";
                        break;
                    case 'SPONSOR':
                        window.location.href = "/pages/sponsorDashboard.html";
                        break;
                    default:
                        window.location.href = "index.html";
                }
            } else {
                window.location.href = "index.html";
            }
        }

        // Check authentication status on page load
        function checkAuthStatus() {
            if (isLoggedIn()) {
                // User is logged in, update UI accordingly
                const user = getUser();
                console.log("User is logged in:", user);

                // Update UI elements
                $("#loginBtn").text("Logout").off('click').click(function() {
                    logoutUser().then(() => {
                        window.location.href = "index.html";
                    });
                });

                $("#heroLoginBtn").text("Logout").off('click').click(function() {
                    logoutUser().then(() => {
                        window.location.href = "index.html";
                    });
                });
            }
        }

        // Update the signup form submission
        $("#signupForm").submit(async function(e) {
            e.preventDefault();

            const submitBtn = $(this).find('.submit-btn');
            const originalText = submitBtn.html();
            submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Creating Account...');
            submitBtn.prop('disabled', true);

            try {
                const registerData = {
                    firstName: $("#firstname").val().trim(),
                    lastName: $("#lastname").val().trim(),
                    email: $("#email").val().trim(),
                    userName: $("#newUsername").val().trim(),
                    password: $("#newPassword").val(),
                    role: $("#role").val(),
                    phoneNumber: $("#phoneNumber").val()?.trim() || "" // Add phone field if needed
                };

                // Validate required fields
                if (!registerData.firstName) throw new Error("First name is required");
                if (!registerData.lastName) throw new Error("Last name is required");
                if (!registerData.email) throw new Error("Email is required");
                if (!registerData.userName) throw new Error("Username is required");
                if (!registerData.password) throw new Error("Password is required");
                if (!registerData.role) throw new Error("Please select a role");

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(registerData.email)) {
                    throw new Error("Please enter a valid email address");
                }

                // Password strength validation (optional)
                if (registerData.password.length < 6) {
                    throw new Error("Password must be at least 6 characters long");
                }

                const result = await registerUser(registerData);


                // Show success message
                showNotification("✅ Account created successfully!", "success");
                
                // Reset form
                this.reset();
                
                // Close modal after delay
                setTimeout(() => {
                    $("#signupModal").removeClass("active").fadeOut();
                    $("body").css("overflow", "auto");
                }, 1500);

                // Auto login after successful registration
                try {
                    const authData = {
                        username: registerData.userName,
                        password: registerData.password
                    };
                    
                    await loginUser(authData);
                    redirectBasedOnRole();
                    
                } catch (loginError) {
                    console.log("Auto-login failed, redirecting to login page");
                    // Redirect to login page if auto-login fails
                    window.location.href = "login.html";
                }

            } catch (error) {
                console.error("Registration error:", error);
                
                // Show user-friendly error messages
                if (error.message.includes("JSON")) {
                    showNotification("✅ Registration completed! Please login.", "success");
                    $("#signupModal").removeClass("active").fadeOut();
                } else {
                    showNotification("❌"+error.message, "error");
                }
            } finally {
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
            }
        });

        // Helper function for notifications (you can use toast library instead)
        function showNotification(message, type = "info") {
            // Remove any existing notifications
            $(".custom-notification").remove();
            
            const notification = $(`
                <div class="custom-notification ${type}">
                    ${message}
                </div>
            `);
            
            $("body").append(notification);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                notification.fadeOut(() => notification.remove());
            }, 5000);
        }

        // Update the login form submission
        $("#loginForm").submit(async function(e) {
            e.preventDefault();

            const submitBtn = $(this).find('.submit-btn');
            submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Logging in...');
            submitBtn.prop('disabled', true);

            try {
                const authData = {
                    username: $("#username").val(),
                    password: $("#password").val()
                };

                const result = await loginUser(authData);

                alert("✅ Login successful!");
                $("#loginModal").removeClass("active").fadeOut();
                $("body").css("overflow", "auto");

                // Redirect based on user role
                redirectBasedOnRole();

            } catch (error) {
                alert("❌Error: " + error.message);
            } finally {
                submitBtn.html('Login');
                submitBtn.prop('disabled', false);
            }
        });

        // Check authentication status when page loads
        checkAuthStatus();
    });