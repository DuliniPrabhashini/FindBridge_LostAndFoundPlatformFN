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

        // Create new request button
        $('#createRequestBtn').click(function() {
            $('#createRequestModal').addClass('active').fadeIn();
        });

        // View ad details
        $('.view-ad').click(function() {
            const adTitle = $(this).closest('.card').find('.card-title').text();
            const adContent = $(this).closest('.card').find('.card-text').text();
            const adImage = $(this).closest('.card').find('.card-img').attr('src');
            const adStatus = $(this).closest('.card').find('.status').text();

            $('#adDetailTitle').text(adTitle);
            $('#adDetailContent').html(`
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <img src="${adImage}" alt="${adTitle}" style="max-width: 100%; border-radius: var(--radius);">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <p>${adContent}</p>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Status</label>
                        <p><span class="status ${adStatus === 'Active' ? 'status-active' : 'status-pending'}">${adStatus}</span></p>
                    </div>
                    <div class="form-group">
                        <label>Date Created</label>
                        <p>January 15, 2023</p>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Views</label>
                        <p>1,248</p>
                    </div>
                    <div class="form-group">
                        <label>Clicks</label>
                        <p>327</p>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-outline">Edit Ad</button>
                    <button class="btn btn-danger">Delete Ad</button>
                </div>
            `);

            $('#adDetailModal').addClass('active').fadeIn();
        });

        // Form submissions
        $('#settingsForm').submit(function(e) {
            e.preventDefault();
            alert('Settings saved successfully!');
            $('#settingsModal').removeClass('active').fadeOut();
        });

        $('#requestForm').submit(function(e) {
            e.preventDefault();
            alert('Request submitted successfully!');
            $('#createRequestModal').removeClass('active').fadeOut();
        });

        // View lost item details
        $('.view-lost-item').click(function() {
            alert('Lost item details would be shown here in a real application.');
        });

        // View found item details
        $('.view-found-item').click(function() {
            alert('Found item details would be shown here in a real application.');
        });

        // View request details
        $('.view-request').click(function() {
            alert('Request details would be shown here in a real application.');
        });
    });