<script>
    // Loading animation
    document.addEventListener('DOMContentLoaded', function() {
        const loadingOverlay = document.getElementById('loading-overlay');
        
        // Show loading animation for 1 second
        setTimeout(function() {
            loadingOverlay.classList.add('fade-out');
            
            // Remove the overlay after fade out completes
            setTimeout(function() {
                loadingOverlay.remove();
            }, 500); // Match this with the CSS transition time
        }, 1000); // 1 second display time
    });
</script>
