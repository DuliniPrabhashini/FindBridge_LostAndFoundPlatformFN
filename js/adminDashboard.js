$(document).ready(function() {
        // Update date and time
        function updateDateTime() {
            const now = new Date();
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            $('#dateTime').text(now.toLocaleDateString('en-US', options));
        }

        updateDateTime();
        setInterval(updateDateTime, 60000); // Update every minute

        // Open modal when menu item is clicked
        $('.menu-item').click(function(e) {
            e.preventDefault();
            const target = $(this).data('target');
            if (target) {
                // Update active menu item
                $('.menu-item').removeClass('active');
                $(this).addClass('active');

                // Show the target modal
                $('#' + target).addClass('active').fadeIn();
                $('body').css('overflow', 'hidden');
            }
        });

        // Open modal when stat card is clicked
        $('.stat-card').click(function() {
            const target = $(this).data('target');
            if (target) {
                $('#' + target).addClass('active').fadeIn();
                $('body').css('overflow', 'hidden');
            }
        });

        // Close modals
        $('.close').click(function() {
            $(this).closest('.modal').removeClass('active').fadeOut();
            $('body').css('overflow', 'auto');
        });

        // Close modal when clicking outside
        $(window).click(function(event) {
            if ($(event.target).hasClass('modal')) {
                $('.modal').removeClass('active').fadeOut();
                $('body').css('overflow', 'auto');
            }
        });

        // Add new user button
        $('#addUserBtn').click(function() {
            $('#userFormTitle').text('Add New User');
            $('#userForm')[0].reset();
            $('#userId').val('');
            $('#deleteUserBtn').hide();
            $('#userFormModal').addClass('active').fadeIn();
        });

        // View user details
        $('.view-user').click(function(e) {
            e.stopPropagation();
            const userId = $(this).closest('tr').data('userid');

            // In a real app, this would fetch user data from an API
            // For demo, we're using mock data
            const userData = {
                1: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    phone: '+1 (555) 123-4567',
                    status: 'active',
                    address: '123 Main St, Anytown, USA'
                },
                2: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                    email: 'jane@example.com',
                    phone: '+1 (555) 987-6543',
                    status: 'active',
                    address: '456 Oak Ave, Somewhere, USA'
                },
                3: {
                    firstName: 'Robert',
                    lastName: 'Johnson',
                    email: 'robert@example.com',
                    phone: '+1 (555) 456-7890',
                    status: 'pending',
                    address: '789 Pine Rd, Nowhere, USA'
                }
            };

            if (userData[userId]) {
                const user = userData[userId];
                $('#userId').val(userId);
                $('#firstName').val(user.firstName);
                $('#lastName').val(user.lastName);
                $('#userEmail').val(user.email);
                $('#userPhone').val(user.phone);
                $('#userStatus').val(user.status);
                $('#userAddress').val(user.address);

                $('#userFormTitle').text('Edit User');
                $('#deleteUserBtn').show();
                $('#userFormModal').addClass('active').fadeIn();
            }
        });

        // Form submissions
        $('#userForm').submit(function(e) {
            e.preventDefault();
            alert('User saved successfully!');
            $('#userFormModal').removeClass('active').fadeOut();
        });

        $('#settingsForm').submit(function(e) {
            e.preventDefault();
            alert('Settings saved successfully!');
            $('#settingsModal').removeClass('active').fadeOut();
        });

        // Delete user
        $('#deleteUserBtn').click(function() {
            if (confirm('Are you sure you want to delete this user?')) {
                alert('User deleted successfully!');
                $('#userFormModal').removeClass('active').fadeOut();
            }
        });

        // View post details
        $('.view-post').click(function() {
            alert('Post details would be shown here in a real application.');
        });

        // View admin request details
        $('.view-request').click(function() {
            alert('Admin request details would be shown here in a real application.');
        });

        // View lost item details
        $('.view-lost-item').click(function() {
            alert('Lost item details would be shown here in a real application.');
        });

        // View found item details
        $('.view-found-item').click(function() {
            alert('Found item details would be shown here in a real application.');
        });
    });