// Platform Data - Easy to modify and add new platforms
const platformsData = [
    {
        id: 'instagram',
        name: 'Instagram',
        url: 'https://instagram.com/hadpixi',
        icon: 'fab fa-instagram',
        color: '#E1306C',
        category: 'social'
    },
    {
        id: 'x',
        name: 'X',
        url: 'https://x.com/hadpixi',
        icon: 'fab fa-x-twitter',
        color: '#000000',
        category: 'social'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        url: 'https://youtube.com/@hadpixi',
        icon: 'fab fa-youtube',
        color: '#FF0000',
        category: 'social'
    },
    {
        id: 'facebook',
        name: 'Facebook',
        url: 'https://facebook.com/hadpixi',
        icon: 'fab fa-facebook',
        color: '#1877F2',
        category: 'social'
    },
    {
        id: 'threads',
        name: 'Threads',
        url: 'https://threads.net/@hadpixi',
        icon: 'fab fa-threads',
        color: '#000000',
        category: 'social'
    },
    {
        id: 'reddit',
        name: 'Reddit',
        url: 'https://reddit.com/user/hadpixi',
        icon: 'fab fa-reddit',
        color: '#FF4500',
        category: 'social'
    },
    {
        id: 'github',
        name: 'GitHub',
        url: 'https://github.com/hadpixi',
        icon: 'fab fa-github',
        color: '#181717',
        category: 'dev'
    },
    {
        id: 'discord',
        name: 'Discord',
        url: 'https://discord.gg/gdE4uDeRS',
        icon: 'fab fa-discord',
        color: '#5865F2',
        category: 'social'
    }
];

let filteredPlatforms = [...platformsData];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    renderLinks(platformsData);
    setupSearch();
    setupFilters();
    initializeNavigation();
});

/**
 * Render links to the grid
 * @param {Array} platforms - Array of platform objects to render
 */
function renderLinks(platforms) {
    const grid = document.getElementById('linksGrid');
    const noResults = document.getElementById('noResults');

    // Clear existing links
    grid.innerHTML = '';

    if (platforms.length === 0) {
        noResults.style.display = 'block';
        grid.style.display = 'none';
        return;
    }

    noResults.style.display = 'none';
    grid.style.display = 'grid';

    platforms.forEach((platform, index) => {
        const linkCard = document.createElement('a');
        linkCard.href = platform.url;
        linkCard.target = '_blank';
        linkCard.rel = 'noopener noreferrer';
        linkCard.className = 'link-card';
        linkCard.setAttribute('data-platform', platform.id);
        linkCard.setAttribute('data-category', platform.category);

        linkCard.innerHTML = `
            <i class="${platform.icon} link-icon" style="color: ${platform.color};"></i>
            <span class="link-name">${platform.name}</span>
        `;

        // Add slight delay to animation for staggered effect
        linkCard.style.animationDelay = `${index * 0.05}s`;

        // Add ripple effect on click
        linkCard.addEventListener('click', function(e) {
            createRipple(e);
        });

        grid.appendChild(linkCard);
    });
}

/**
 * Setup search functionality
 */
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');

    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();

        // Show/hide clear button
        clearButton.style.display = searchTerm ? 'block' : 'none';

        if (searchTerm === '') {
            filteredPlatforms = platformsData.filter(p => 
                currentFilter === 'all' || p.category === currentFilter
            );
        } else {
            filteredPlatforms = platformsData.filter(platform => {
                const matchesSearch = platform.name.toLowerCase().includes(searchTerm) ||
                                    platform.id.toLowerCase().includes(searchTerm);
                const matchesFilter = currentFilter === 'all' || platform.category === currentFilter;
                return matchesSearch && matchesFilter;
            });
        }

        renderLinks(filteredPlatforms);
    });

    // Clear button functionality
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        filteredPlatforms = platformsData.filter(p =>
            currentFilter === 'all' || p.category === currentFilter
        );
        renderLinks(filteredPlatforms);
        searchInput.focus();
    });
}

/**
 * Setup filter tags functionality
 */
function setupFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');

    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            this.classList.add('active');

            currentFilter = this.getAttribute('data-filter');
            const searchInput = document.getElementById('searchInput');
            const searchTerm = searchInput.value.toLowerCase().trim();

            if (searchTerm === '') {
                filteredPlatforms = platformsData.filter(p =>
                    currentFilter === 'all' || p.category === currentFilter
                );
            } else {
                filteredPlatforms = platformsData.filter(platform => {
                    const matchesSearch = platform.name.toLowerCase().includes(searchTerm) ||
                                        platform.id.toLowerCase().includes(searchTerm);
                    const matchesFilter = currentFilter === 'all' || platform.category === currentFilter;
                    return matchesSearch && matchesFilter;
                });
            }

            renderLinks(filteredPlatforms);
        });
    });
}

/**
 * Create ripple effect on click
 * @param {Event} event - Click event
 */
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Remove existing ripples
    const ripples = button.querySelectorAll('.ripple');
    ripples.forEach(r => r.remove());

    button.appendChild(ripple);
}

/**
 * Add new platform to the list (for future use)
 * @param {Object} platform - Platform object with id, name, url, icon, color, category
 */
function addPlatform(platform) {
    platformsData.push(platform);
    filteredPlatforms = [...platformsData];
    renderLinks(filteredPlatforms);
}

/**
 * Remove platform from the list (for future use)
 * @param {String} platformId - ID of the platform to remove
 */
function removePlatform(platformId) {
    const index = platformsData.findIndex(p => p.id === platformId);
    if (index > -1) {
        platformsData.splice(index, 1);
        filteredPlatforms = platformsData.filter(p =>
            currentFilter === 'all' || p.category === currentFilter
        );
        renderLinks(filteredPlatforms);
    }
}

/**
 * Update existing platform (for future use)
 * @param {String} platformId - ID of the platform to update
 * @param {Object} updatedData - Updated platform data
 */
function updatePlatform(platformId, updatedData) {
    const platform = platformsData.find(p => p.id === platformId);
    if (platform) {
        Object.assign(platform, updatedData);
        filteredPlatforms = platformsData.filter(p =>
            currentFilter === 'all' || p.category === currentFilter
        );
        renderLinks(filteredPlatforms);
    }
}
