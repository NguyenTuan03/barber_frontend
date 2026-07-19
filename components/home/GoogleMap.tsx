

export default function GoogleMap() {
    return (
        <section className="relative w-full h-[350px] md:h-[450px] z-10 -mt-20 md:-mt-24 overflow-hidden border-b border-zinc-100 dark:border-zinc-900">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5949002175816!2d106.7288732753781!3d10.803916398771715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527d83ba221e5%3A%2Fx7348995971a3eca7!2sT99%20Barbershop!5e0!3m2!1sen!2s!4v1752576567530!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="T99 Barber Shop Location"
                className="w-full h-full grayscale dark:invert dark:opacity-80 transition-all duration-300"
            />
            {/* Soft dark/light vignette around the map corners to match design */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FDFBF7]/30 dark:from-zinc-950/20 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FDFBF7]/30 dark:from-zinc-950/20 to-transparent z-20 pointer-events-none" />
        </section>
    );
}