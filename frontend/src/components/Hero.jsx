import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-white text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="w-12 h-1 bg-black"></span>
        <p className="font-paragraph text-xs uppercase tracking-widest text-gray-500">
          AllKit Store
        </p>
      </div>

      <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-black mb-4">
        Everything You Need,
        <br />
        <span className="font-normal text-gray-700">One Store.</span>
      </h1>

      <p className="font-paragraph text-gray-600 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-xl mb-8">
        Curated fashion, electronics, and lifestyle essentials — delivered for modern living.
      </p>

      <div className="flex flex-wrap justify-center gap-5">
        <Link to="/collection">
          <button className="px-10 py-4 bg-black text-white text-base font-paragraph tracking-wide rounded-md shadow-md hover:bg-gray-800 transition duration-300 transform hover:-translate-y-1">
            Shop Now
          </button>
        </Link>

        <Link to="/collection">
          <button className="px-10 py-4 border border-black text-black text-base font-paragraph tracking-wide rounded-md hover:bg-black hover:text-white transition duration-300 transform hover:-translate-y-1">
            Explore Collection
          </button>
        </Link>
      </div>

    </section>
  )
}

export default Hero
