
document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    preventBackNavigation(token);
});


const preventBackNavigation = (token) => {
    if (token) {

        window.history.pushState(null, `/*`, window.location.href);
        
        window.addEventListener('popstate', function() {

            window.history.pushState(null, '', window.location.href);
        }); 
        };
    }
