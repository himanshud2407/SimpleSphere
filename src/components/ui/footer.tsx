import { motion } from 'framer-motion';
import {
    Globe,
    Share2,
    MessageCircle,
    Link as LinkIcon,
    Send,
    Feather,
} from 'lucide-react';

const links = [
    { title: 'Home', href: '#' },
    { title: 'All Courses', href: '#' },
    { title: 'Blogs', href: '#' },
    { title: 'Contact Us', href: '#' },
    { title: 'About Us', href: '#' },
];

const socialLinks = [
    { icon: Share2, label: 'Share', href: '#' },
    { icon: MessageCircle, label: 'Message', href: '#' },
    { icon: LinkIcon, label: 'Link', href: '#' },
    { icon: Globe, label: 'Website', href: '#' },
    { icon: Send, label: 'Send', href: '#' },
    { icon: Feather, label: 'Write', href: '#' },
];

export default function FooterSection() {
    return (
        <footer className="relative overflow-hidden bg-white py-16 md:py-32 border-t border-slate-100">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            
            <div className="mx-auto max-w-5xl px-6 relative z-10">
                {/* Logo Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto block size-fit mb-12"
                >
                    <a href="/" aria-label="go home" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute -inset-1 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500" />
                            <img src="/logo.svg" alt="SimpleSphere Logo" className="relative h-25 w-auto    " />
                        </div>
                        {/* <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            SimpleSphere
                        </span> */}
                    </a>
                </motion.div>

                {/* Partner Logos Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="border-t border-slate-50"
                >
                    {/* <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">Trusted by industry leaders</p> */}
                    {/* <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50 transition-all duration-500">
                        {[
                            'https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1614850523530-92823000600a?q=80&w=2070&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
                        ].map((src, i) => (
                            <img key={i} src={src} alt="partner" className="h-6 w-auto object-contain cursor-pointer hover:scale-110 transition-transform" />
                        ))}
                    </div> */}
                </motion.div>

                {/* Navigation Links */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="my-8 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-medium"
                >
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="text-slate-500 hover:text-blue-600 transition-colors duration-300 relative group"
                        >
                            <span>{link.title}</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </motion.div>

                {/* Social Links */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="my-12 flex flex-wrap justify-center gap-6"
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            whileHover={{ y: -4, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center size-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
                        >
                            <social.icon className="size-5" />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Divider Line */}
                <div className="w-full h-px bg-slate-100 mb-8" />

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-slate-400 block text-center text-sm font-light tracking-wide"
                >
                    <div className="flex flex-col items-center gap-4">
                        <span>© {new Date().getFullYear()} SimpleSphere, Inc. All rights reserved.</span>
                        <div className="flex gap-6 text-xs uppercase tracking-widest font-semibold">
                            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Cookies</a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Subtle background circles */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />
        </footer>
    );
}
