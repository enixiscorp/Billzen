/**
 * Gestionnaire de thèmes
 * Gère l'application des thèmes et personnalisations
 */

class ThemeManager {
    constructor() {
        this.themes = {};
        this.currentTheme = 'default';
        this.customizations = {};
        this.loadThemes();
    }
    
    /**
     * Charge les thèmes prédéfinis (5-10 thèmes professionnels)
     */
    loadThemes() {
        this.themes = {
            'default': {
                id: 'default',
                name: 'Défaut',
                colors: {
                    primary: '#2563eb',
                    secondary: '#0f172a',
                    accent: '#22c55e',
                    text: '#020617',
                    background: '#ffffff',
                    border: '#e2e8f0',
                    headerBg: '#f8fafc'
                },
                fonts: {
                    header: "'Inter', sans-serif",
                    body: "'Inter', sans-serif",
                    numbers: "'Inter', sans-serif"
                },
                layout: {
                    headerHeight: '120px',
                    margins: '24px',
                    borderRadius: '8px'
                }
            },
            'modern': {
                id: 'modern',
                name: 'Moderne',
                colors: {
                    primary: '#6366f1',
                    secondary: '#1e1b4b',
                    accent: '#f59e0b',
                    text: '#111827',
                    background: '#ffffff',
                    border: '#e5e7eb',
                    headerBg: '#f9fafb'
                },
                fonts: {
                    header: "'Poppins', sans-serif",
                    body: "'Inter', sans-serif",
                    numbers: "'JetBrains Mono', monospace"
                },
                layout: {
                    headerHeight: '140px',
                    margins: '32px',
                    borderRadius: '12px'
                }
            },
            'classic': {
                id: 'classic',
                name: 'Classique',
                colors: {
                    primary: '#059669',
                    secondary: '#064e3b',
                    accent: '#dc2626',
                    text: '#1f2937',
                    background: '#ffffff',
                    border: '#d1d5db',
                    headerBg: '#f3f4f6'
                },
                fonts: {
                    header: "'Times New Roman', serif",
                    body: "'Georgia', serif",
                    numbers: "'Times New Roman', serif"
                },
                layout: {
                    headerHeight: '100px',
                    margins: '20px',
                    borderRadius: '4px'
                }
            },
            'corporate': {
                id: 'corporate',
                name: 'Corporate',
                colors: {
                    primary: '#1f2937',
                    secondary: '#111827',
                    accent: '#3b82f6',
                    text: '#374151',
                    background: '#ffffff',
                    border: '#d1d5db',
                    headerBg: '#f9fafb'
                },
                fonts: {
                    header: "'Roboto', sans-serif",
                    body: "'Roboto', sans-serif",
                    numbers: "'Roboto Mono', monospace"
                },
                layout: {
                    headerHeight: '110px',
                    margins: '28px',
                    borderRadius: '6px'
                }
            },
            'elegant': {
                id: 'elegant',
                name: 'Élégant',
                colors: {
                    primary: '#7c3aed',
                    secondary: '#581c87',
                    accent: '#f97316',
                    text: '#1f2937',
                    background: '#ffffff',
                    border: '#e5e7eb',
                    headerBg: '#faf5ff'
                },
                fonts: {
                    header: "'Playfair Display', serif",
                    body: "'Source Sans Pro', sans-serif",
                    numbers: "'Source Sans Pro', sans-serif"
                },
                layout: {
                    headerHeight: '130px',
                    margins: '30px',
                    borderRadius: '10px'
                }
            },
            'minimal': {
                id: 'minimal',
                name: 'Minimal',
                colors: {
                    primary: '#000000',
                    secondary: '#374151',
                    accent: '#6b7280',
                    text: '#111827',
                    background: '#ffffff',
                    border: '#e5e7eb',
                    headerBg: '#ffffff'
                },
                fonts: {
                    header: "'Helvetica Neue', sans-serif",
                    body: "'Helvetica Neue', sans-serif",
                    numbers: "'SF Mono', monospace"
                },
                layout: {
                    headerHeight: '90px',
                    margins: '24px',
                    borderRadius: '0px'
                }
            },
            'creative': {
                id: 'creative',
                name: 'Créatif',
                colors: {
                    primary: '#ec4899',
                    secondary: '#be185d',
                    accent: '#06b6d4',
                    text: '#1f2937',
                    background: '#ffffff',
                    border: '#f3e8ff',
                    headerBg: '#fdf2f8'
                },
                fonts: {
                    header: "'Montserrat', sans-serif",
                    body: "'Open Sans', sans-serif",
                    numbers: "'Fira Code', monospace"
                },
                layout: {
                    headerHeight: '150px',
                    margins: '36px',
                    borderRadius: '16px'
                }
            }
        };
    }
    
    /**
     * Obtient tous les thèmes disponibles
     * @returns {Object} Tous les thèmes
     */
    getAllThemes() {
        return this.themes;
    }
    
    /**
     * Obtient un thème spécifique
     * @param {string} themeId - ID du thème
     * @returns {Object|null} Thème ou null
     */
    getTheme(themeId) {
        return this.themes[themeId] || null;
    }
    
    /**
     * Obtient le thème courant
     * @returns {Object} Thème courant
     */
    getCurrentTheme() {
        return this.themes[this.currentTheme];
    }
    
    /**
     * Applique un thème
     * @param {string} themeId - ID du thème
     * @returns {boolean} True si le thème a été appliqué avec succès
     */
    applyTheme(themeId) {
        const theme = this.getTheme(themeId);
        if (!theme) return false;
        
        this.currentTheme = themeId;
        
        // Appliquer les variables CSS
        const root = document.documentElement;
        
        // Couleurs
        root.style.setProperty('--color-primary', theme.colors.primary);
        root.style.setProperty('--color-secondary', theme.colors.secondary);
        root.style.setProperty('--color-accent', theme.colors.accent);
        root.style.setProperty('--color-text', theme.colors.text);
        root.style.setProperty('--color-background', theme.colors.background);
        root.style.setProperty('--color-border', theme.colors.border);
        root.style.setProperty('--color-header-bg', theme.colors.headerBg);
        
        // Polices
        root.style.setProperty('--font-header', theme.fonts.header);
        root.style.setProperty('--font-body', theme.fonts.body);
        root.style.setProperty('--font-numbers', theme.fonts.numbers);
        
        // Layout
        root.style.setProperty('--header-height', theme.layout.headerHeight);
        root.style.setProperty('--layout-margins', theme.layout.margins);
        root.style.setProperty('--border-radius', theme.layout.borderRadius);
        
        // Appliquer les classes de thème
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${themeId}`);
        
        // Déclencher un événement de changement de thème
        this.dispatchThemeChangeEvent(themeId);
        
        return true;
    }
    
    /**
     * Personnalise les couleurs
     * @param {Object} colorConfig - Configuration des couleurs
     */
    customizeColors(colorConfig) {
        this.customizations.colors = { ...this.customizations.colors, ...colorConfig };
        
        const root = document.documentElement;
        
        // Appliquer les personnalisations
        Object.entries(colorConfig).forEach(([key, value]) => {
            if (value) {
                root.style.setProperty(`--color-${key}`, value);
            }
        });
        
        this.dispatchCustomizationEvent('colors', colorConfig);
    }
    
    /**
     * Personnalise les polices
     * @param {Object} fontConfig - Configuration des polices
     */
    customizeFonts(fontConfig) {
        this.customizations.fonts = { ...this.customizations.fonts, ...fontConfig };
        
        const root = document.documentElement;
        
        // Appliquer les personnalisations
        Object.entries(fontConfig).forEach(([key, value]) => {
            if (value) {
                root.style.setProperty(`--font-${key}`, value);
            }
        });
        
        this.dispatchCustomizationEvent('fonts', fontConfig);
    }
    
    /**
     * Personnalise le layout
     * @param {Object} layoutConfig - Configuration du layout
     */
    customizeLayout(layoutConfig) {
        this.customizations.layout = { ...this.customizations.layout, ...layoutConfig };
        
        const root = document.documentElement;
        
        // Appliquer les personnalisations
        Object.entries(layoutConfig).forEach(([key, value]) => {
            if (value) {
                root.style.setProperty(`--${key}`, value);
            }
        });
        
        this.dispatchCustomizationEvent('layout', layoutConfig);
    }
    
    /**
     * Obtient les polices disponibles par catégorie
     * @returns {Object} Polices par catégorie
     */
    getAvailableFonts() {
        return {
            'sans-serif': [
                "'Inter', sans-serif",
                "'Roboto', sans-serif",
                "'Open Sans', sans-serif",
                "'Source Sans Pro', sans-serif",
                "'Poppins', sans-serif",
                "'Montserrat', sans-serif",
                "'Helvetica Neue', sans-serif"
            ],
            'serif': [
                "'Times New Roman', serif",
                "'Georgia', serif",
                "'Playfair Display', serif",
                "'Merriweather', serif",
                "'Crimson Text', serif"
            ],
            'monospace': [
                "'JetBrains Mono', monospace",
                "'Fira Code', monospace",
                "'SF Mono', monospace",
                "'Roboto Mono', monospace",
                "'Source Code Pro', monospace"
            ]
        };
    }
    
    /**
     * Vérifie si au moins une police de chaque catégorie est disponible
     * @returns {boolean} True si toutes les catégories sont représentées
     */
    validateFontAvailability() {
        const fonts = this.getAvailableFonts();
        const categories = ['sans-serif', 'serif', 'monospace'];
        
        return categories.every(category => 
            fonts[category] && fonts[category].length > 0
        );
    }
    
    /**
     * Compte le nombre de thèmes disponibles
     * @returns {number} Nombre de thèmes
     */
    getThemeCount() {
        return Object.keys(this.themes).length;
    }
    
    /**
     * Vérifie si le nombre de thèmes est dans la plage requise (5-10)
     * @returns {boolean} True si le nombre est valide
     */
    validateThemeCount() {
        const count = this.getThemeCount();
        return count >= 5 && count <= 10;
    }
    
    /**
     * Remet le thème par défaut
     */
    resetToDefault() {
        this.applyTheme('default');
        this.customizations = {};
    }
    
    /**
     * Obtient les personnalisations courantes
     * @returns {Object} Personnalisations
     */
    getCustomizations() {
        return this.customizations;
    }
    
    /**
     * Exporte la configuration courante
     * @returns {Object} Configuration complète
     */
    exportConfiguration() {
        return {
            currentTheme: this.currentTheme,
            customizations: this.customizations
        };
    }
    
    /**
     * Importe une configuration
     * @param {Object} config - Configuration à importer
     */
    importConfiguration(config) {
        if (config.currentTheme) {
            this.applyTheme(config.currentTheme);
        }
        
        if (config.customizations) {
            if (config.customizations.colors) {
                this.customizeColors(config.customizations.colors);
            }
            if (config.customizations.fonts) {
                this.customizeFonts(config.customizations.fonts);
            }
            if (config.customizations.layout) {
                this.customizeLayout(config.customizations.layout);
            }
        }
    }
    
    /**
     * Déclenche un événement de changement de thème
     * @param {string} themeId - ID du thème
     */
    dispatchThemeChangeEvent(themeId) {
        const event = new CustomEvent('themeChanged', {
            detail: { themeId, theme: this.getTheme(themeId) }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Déclenche un événement de personnalisation
     * @param {string} type - Type de personnalisation
     * @param {Object} config - Configuration
     */
    dispatchCustomizationEvent(type, config) {
        const event = new CustomEvent('themeCustomized', {
            detail: { type, config }
        });
        document.dispatchEvent(event);
    }
}

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}