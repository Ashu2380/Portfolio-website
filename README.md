# Asharam Saini - Portfolio Website

A modern, responsive, and interactive portfolio website showcasing skills, projects, education, and professional experience. Built with vanilla HTML, CSS, and JavaScript, featuring advanced animations, dark/light theme toggle, and mobile-first design.

## 🚀 Features

### ✨ Modern Design & Animations
- **Sleek UI/UX** - Modern design with smooth animations and transitions
- **Loading Screen** - Animated loading screen with CSS cube animation
- **Scroll Animations** - Elements animate into view as you scroll
- **Floating Icons** - Interactive floating technology icons in hero section
- **Typing Animation** - Dynamic typing effect for name and roles
- **Smooth Scrolling** - Seamless navigation between sections

### 🎨 Interactive Elements
- **Dark/Light Theme Toggle** - Switch between themes with smooth transitions
- **Mobile-First Responsive Design** - Perfect on all devices and screen sizes
- **Interactive Navigation** - Active section highlighting and smooth scrolling
- **Skill Progress Bars** - Animated skill bars that fill when in view
- **Counter Animations** - Animated statistics counters
- **Hover Effects** - Enhanced hover animations on cards and buttons

### 📱 Responsive & Accessible
- **Mobile Navigation** - Collapsible hamburger menu for mobile devices
- **Touch Optimized** - All interactions work perfectly on touch devices
- **Accessibility** - Proper semantic HTML and keyboard navigation support
- **Fast Loading** - Optimized performance with lazy loading and preloading

### 🔥 Advanced Functionality
- **Project Filtering** - Filter projects by category (All, Full Stack, Salesforce, Frontend)
- **Project Modals** - Detailed project information in beautiful modal popups
- **Contact Form** - Working contact form with validation and success feedback
- **Theme Persistence** - Remembers your theme preference using localStorage
- **Smooth Parallax** - Subtle parallax effects for enhanced visual appeal
- **Back to Top** - Smooth scroll to top functionality

## 📁 Project Structure

```
portfolio-website/
├── index.html              # Main HTML file
├── css/
│   ├── style.css           # Main stylesheet with variables and responsive design
│   └── modal-styles.css    # Additional styles for project modals
├── js/
│   └── script.js          # All JavaScript functionality
├── images/                # Project and profile images
├── assets/               # Additional assets (resume, favicon, etc.)
└── README.md            # This file
```

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup and modern HTML features
- **CSS3** - Advanced CSS with custom properties, Grid, Flexbox, and animations
- **JavaScript (ES6+)** - Modern JavaScript with modules, async/await, and DOM APIs

### Design & UX
- **CSS Custom Properties** - Consistent theming and easy customization
- **CSS Grid & Flexbox** - Modern layout techniques
- **CSS Animations** - Custom keyframe animations and transitions
- **Intersection Observer API** - Efficient scroll-based animations
- **CSS Backdrop Filter** - Modern blur effects for glassmorphism

### Performance
- **Lazy Loading** - Images load only when needed
- **Intersection Observer** - Efficient scroll event handling
- **RequestAnimationFrame** - Smooth 60fps animations
- **Debouncing & Throttling** - Optimized event handling

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for best experience)

### Installation

1. **Clone or download** the repository
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. **Add your content**:
   - Replace `images/profile-photo.jpg` with your profile picture
   - Add project images to the `images/` folder
   - Update project information in `js/script.js` (projectData object)
   - Add your resume PDF to `assets/Asharam-Saini-Resume.pdf`

3. **Customize the content**:
   - Update personal information in `index.html`
   - Modify skills and percentages in the skills section
   - Update education timeline with your information
   - Add your training and certifications
   - Update social media links and contact information

4. **Serve the website**:
   - **Simple**: Open `index.html` directly in your browser
   - **Recommended**: Use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if you have live-server installed)
     npx live-server
     
     # Using PHP
     php -S localhost:8000
     ```

5. **Access your portfolio** at `http://localhost:8000`

## 🎨 Customization

### Colors & Theme
The website uses CSS custom properties for easy theming. Main colors can be changed in `css/style.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #f59e0b;    /* Accent color */
    --accent-color: #10b981;       /* Success/highlight color */
    /* ... more variables */
}
```

### Content Updates
1. **Personal Information**: Update `index.html` with your details
2. **Skills**: Modify skill percentages in the skills section
3. **Projects**: Update the `projectData` object in `js/script.js`
4. **Social Links**: Update all social media URLs throughout the HTML

### Adding New Sections
The modular CSS makes it easy to add new sections:
1. Add HTML structure following existing patterns
2. Use existing CSS classes for consistency
3. Add scroll animations by including the section in `initializeScrollAnimations()`

## 📧 Contact Form

The contact form includes:
- Real-time validation
- Error messages
- Success feedback
- Loading states

**Note**: The form currently shows a success message after 2 seconds (simulated). To make it functional:
1. Set up a backend service (Node.js, PHP, etc.)
2. Update the form submission handler in `js/script.js`
3. Or integrate with services like Netlify Forms, Formspree, etc.

## 🌐 Browser Support

- **Chrome** 88+
- **Firefox** 87+
- **Safari** 14+
- **Edge** 88+

Features gracefully degrade in older browsers.

## 📱 Mobile Experience

- Fully responsive design with mobile-first approach
- Touch-optimized interactions
- Collapsible navigation menu
- Optimized typography and spacing for mobile
- Fast loading on slower connections

## 🔧 Advanced Features

### Theme System
- Automatic system theme detection
- Manual toggle between light/dark modes
- Smooth color transitions
- Theme preference persistence

### Performance Optimizations
- Lazy loading for images
- Intersection Observer for efficient scroll handling
- RequestAnimationFrame for smooth animations
- Debounced scroll events
- CSS containment for better rendering

### Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Alt texts for images
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to a GitHub repository
- **Firebase Hosting**: Use Firebase CLI
- **Surge.sh**: Simple command-line deployment

### Custom Domain
Update social media links and contact information when deploying to a custom domain.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ⭐ Showcase

This portfolio demonstrates:
- Modern web development practices
- Responsive design principles
- JavaScript programming skills
- CSS animation and transition mastery
- User experience design
- Performance optimization techniques

Perfect for showcasing your skills to potential employers or clients!

---

**Made with ❤️ by Asharam Saini** | [LinkedIn](https://www.linkedin.com/in/asharam-saini/) | [GitHub](https://github.com/Ashu2380)
