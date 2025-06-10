document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    console.log('Portfolio initialisé avec succès !');
}

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Fermer le menu mobile quand on clique sur un lien
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

function initializeScrollEffects() {
    // Effet de défilement doux pour les liens d'ancrage
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compenser la navbar fixe
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Effet parallaxe léger sur le header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

function initializeAnimations() {
    // Animation d'apparition des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer toutes les sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
    
    // Animation des cartes au survol
    const cards = document.querySelectorAll('.competence-card, .projet-card, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Fonction pour télécharger le CV
function downloadCV() {
    // Méthode 1: Si vous avez un fichier CV existant sur votre serveur
    // Remplacez 'cv-gabriel-monnier.pdf' par le chemin vers votre fichier CV
    const cvUrl = 'Ressources/MONNIER_Gabriel_CV.pdf';
    
    // Créer un lien temporaire pour le téléchargement
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV-Gabriel-Monnier.pdf';
    link.style.display = 'none';
    
    // Ajouter le lien au DOM, cliquer dessus, puis le supprimer
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optionnel: Afficher un message de confirmation
    //showNotification('Téléchargement du CV en cours...', 'success');
}

// Fonction alternative si vous n'avez pas encore de fichier CV
function downloadCVAlternative() {
    // Générer un CV basique en HTML et le convertir en PDF côté client
    // Cette méthode nécessite une bibliothèque comme jsPDF
    
    alert('Fonctionnalité de téléchargement en cours de développement.\nVeuillez me contacter directement pour obtenir mon CV.');
    
    // Rediriger vers la section contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Fonction pour afficher des notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    // Couleurs selon le type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#2ecc71';
            break;
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f39c12';
            break;
        default:
            notification.style.backgroundColor = '#3498db';
    }
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Supprimer après 4 secondes
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Fonction pour gérer les erreurs de chargement d'images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Remplacer par une image placeholder si l'image ne charge pas
            this.src = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect fill="%23f8f9fa" width="300" height="200"/><text fill="%23666" font-family="Arial" font-size="14" x="50%" y="50%" text-anchor="middle" dy=".3em">Image non disponible</text></svg>';
        });
    });
}

// Initialiser la gestion des erreurs d'images
document.addEventListener('DOMContentLoaded', function() {
    handleImageErrors();
});

// Fonction pour le formulaire de contact (si vous en ajoutez un plus tard)
function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Ici vous pouvez envoyer les données à votre serveur
            console.log('Données du formulaire:', data);
            
            // Afficher un message de confirmation
            showNotification('Message envoyé avec succès !', 'success');
            
            // Réinitialiser le formulaire
            contactForm.reset();
        });
    }
}

// Fonction pour le mode sombre (optionnel)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Sauvegarder la préférence
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Charger la préférence de mode sombre
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    loadDarkModePreference();
    handleContactForm();
});