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

        // View post details
        $('.view-post, .view-saved-post').click(function() {
            const postTitle = $(this).closest('.card').find('.card-title').text();
            const postContent = $(this).closest('.card').find('.card-text').text();
            const postImage = $(this).closest('.card').find('.card-img').attr('src');
            const postStatus = $(this).closest('.card').find('.status').text();

            $('#postDetailTitle').text(postTitle);
            $('#postDetailContent').html(`
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <img src="${postImage}" alt="${postTitle}" style="max-width: 100%; border-radius: var(--radius);">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <p>${postContent}</p>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Status</label>
                        <p><span class="status ${postStatus === 'Active' ? 'status-active' : 'status-pending'}">${postStatus}</span></p>
                    </div>
                    <div class="form-group">
                        <label>Date Posted</label>
                        <p>January 15, 2023</p>
                    </div>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <p>Colombo, Sri Lanka</p>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-outline">Edit Post</button>
                    <button class="btn btn-danger">Delete Post</button>
                </div>
            `);

            $('#postDetailModal').addClass('active').fadeIn();
        });

        // Start chat functionality
        $('.start-chat').click(function() {
            const userName = $(this).closest('tr').find('td:first-child span').text();
            $('#chatContainer').show();
            $('#messageContainer').scrollTop($('#messageContainer')[0].scrollHeight);
        });

        // Send message functionality
        $('#sendMessageBtn').click(function() {
            const message = $('#messageInput').val();
            if (message.trim() !== '') {
                const now = new Date();
                const time = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

                $('#messageContainer').append(`
                    <div class="message sent">
                        <div class="message-content">${message}</div>
                        <div class="message-time">${time}</div>
                    </div>
                `);

                $('#messageInput').val('');
                $('#messageContainer').scrollTop($('#messageContainer')[0].scrollHeight);
            }
        });

        // Form submissions
        $('#settingsForm').submit(function(e) {
            e.preventDefault();
            alert('Settings saved successfully!');
            $('#settingsModal').removeClass('active').fadeOut();
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