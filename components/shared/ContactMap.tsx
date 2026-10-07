export function ContactMap({ className = '' }: { className?: string }) {
  return (
    <div className={`home-card relative min-h-[300px] overflow-hidden rounded-[2.5rem] border border-emerald-100/70 bg-white shadow-sm ${className}`}>
      <iframe
        title="Fresh 360 location in West Venkatapuram, Secunderabad"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30441.375128193005!2d78.4234929347656!3d17.499306163669495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9aea5f64dafd%3A0x8e33bb69c4928bde!2s1-20-40%2F82%2C%20West%20Venkatapuram%2C%20Alwal%2C%20Hyderabad%2C%20Secunderabad%2C%20Telangana%20500015!5e0!3m2!1sen!2sin!4v1791384049714!5m2!1sen!2sin"
        width="400"
        height="300"
        className="absolute inset-0 block h-full w-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
