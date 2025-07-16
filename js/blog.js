console.log("blog.js cargado correctamente");
document.addEventListener('DOMContentLoaded', function() {
    const allPosts = Array.from(document.querySelectorAll('.blog-post'));
    const paginationContainer = document.querySelector('.blog-pagination');
    const postsPerPage = 5;
    let currentPage = 1;
    let isSearchActive = false;
    let currentSearchTerm = '';
    

    initBlog();
    
    function initBlog() {

        setupSearch();
        
        setupCategoryFilters();

        showRecentPosts();

        showPage(1);
    }
    
    function setupSearch() {
        const searchForm = document.querySelector('.blog-search');
        if (!searchForm) return;
        
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('.blog-search__input');
            currentSearchTerm = searchInput.value.toLowerCase().trim();
            isSearchActive = currentSearchTerm !== '';
            
            filterPosts();
        });
    }
    
    function setupCategoryFilters() {
        document.querySelectorAll('.blog-sidebar__link[data-category]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category').toLowerCase();
                
                document.querySelector('.blog-search__input').value = `Categoría: ${category}`;
                currentSearchTerm = category;
                isSearchActive = true;
                
                filterPosts();
            });
        });
    }
    
    
    function createNoResultsMessage() {
        const msg = document.createElement('p');
        msg.className = 'no-results-message';
        msg.style.display = 'none';
        document.querySelector('.blog-posts').appendChild(msg);
        return msg;
    }
    
    function showRecentPosts() {
        const recentPosts = [...allPosts]
            .sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date))
            .slice(0, 2);
        
        const recentLinks = document.querySelectorAll('.blog-sidebar__list--recent .blog-sidebar__link');
        recentPosts.forEach((post, i) => {
            if (recentLinks[i]) {
                recentLinks[i].textContent = post.querySelector('.blog-post__title').textContent;
                recentLinks[i].href = post.querySelector('.blog-post__link').href;
            }
        });
    }
    
    function showPage(page) {
        currentPage = page;
        const visiblePosts = getVisiblePosts();
        
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        

        allPosts.forEach((post, i) => {
            post.style.display = (i >= startIndex && i < endIndex && visiblePosts.includes(post)) 
                ? 'block' 
                : 'none';
        });
        
        updatePagination();
    }
    
    function getVisiblePosts() {
        return allPosts.filter(post => {
            return post.style.display !== 'none' && 
                   window.getComputedStyle(post).display !== 'none';
        });
    }
    
    function updatePagination() {
        if (!paginationContainer) return;
        
        const visiblePosts = getVisiblePosts();
        const totalPages = Math.ceil(visiblePosts.length / postsPerPage);
        
        if (totalPages <= 1) {
            togglePagination(false);
            return;
        }
        
        togglePagination(true);
        paginationContainer.innerHTML = '';
 
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.className = `blog-pagination__link ${i === currentPage ? 'active' : ''}`;
            pageLink.textContent = i;
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                showPage(i);
            });
            paginationContainer.appendChild(pageLink);
        }
    }
    
    function togglePagination(show) {
        if (paginationContainer) {
            paginationContainer.style.display = show ? 'flex' : 'none';
        }
    }

    function filterPosts() {
        let hasResults = false;

        allPosts.forEach(post => post.style.display = 'none');
        
        allPosts.forEach(post => {
            const titleElem = post.querySelector('.blog-post__title');
            const excerptElem = post.querySelector('.blog-post__excerpt');
            const tagsElem = post.querySelector('.blog-post__tags');
            const categoryElem = post.querySelector('.blog-post__category');
            
            if (!titleElem) return;
            
            const title = titleElem.textContent.toLowerCase();
            const excerpt = excerptElem ? excerptElem.textContent.toLowerCase() : '';
            const tags = tagsElem ? tagsElem.textContent.toLowerCase() : '';
            const category = categoryElem ? categoryElem.textContent.toLowerCase() : '';
            
            const matchesSearch = !isSearchActive || 
                title.includes(currentSearchTerm) || 
                excerpt.includes(currentSearchTerm) || 
                tags.includes(currentSearchTerm) ||
                category.includes(currentSearchTerm);
            
            if (matchesSearch) {
                post.style.display = 'block';
                hasResults = true;
            }
        });
        
        if (!hasResults && isSearchActive) {
            alert(`🔍 No se encontraron resultados para "${currentSearchTerm}"`);
            currentSearchTerm = '';
            isSearchActive = false;
            const searchInput = document.querySelector('.blog-search__input');
            if (searchInput) searchInput.value = '';
            allPosts.forEach(post => post.style.display = 'block');
            showPage(1);
        } else {
            showPage(1);
        }
        
        togglePagination(hasResults);
    }
});
