import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import carImage from "../../assets/car.png";

export default function HeroSection() {
  const floating = {
    animate: {
      y: [0, -18, 0],
      rotate: [0, 1, 0, -1, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const fadeLeft = {
    hidden: {
      opacity: 0,
      x: -70,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const fadeRight = {
    hidden: {
      opacity: 0,
      x: 70,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <section
      id="home"
      className="
        relative
        overflow-hidden
        min-h-screen
        flex
        items-center
        pt-28
        lg:pt-32
        bg-gradient-to-br
        from-white
        via-[#FCFDF7]
        to-[#EEF5C5]
        "
    >
      {/* Background Glow */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute -top-52 -right-52 w-[700px] h-[700px] rounded-full bg-[#DEE33E]/20 blur-[170px]"
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute -bottom-48 -left-24 w-[500px] h-[500px] rounded-full bg-[#9FA324]/20 blur-[160px]"
      />

      <div className="relative max-w-7xl mx-auto px-8 grid lg:grid-cols-2 items-center gap-10">
        {/* LEFT */}

        <motion.div variants={fadeLeft} initial="hidden" animate="visible">
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#DEE33E]/20 px-5 py-2 text-sm font-semibold text-[#7A8121]"
          >
            🚗 Trusted Garage Since 2016
          </motion.div>

          <h1 className="mt-8 text-6xl lg:text-7xl font-black leading-tight text-[#1A1A1A]">
            Professional
            <br />
            Car Repair &
            <br />
            Maintenance
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
            GaragePro helps you keep your vehicle in excellent condition with
            certified mechanics, transparent pricing, genuine parts, and
            real-time repair tracking.
          </p>

          {/* BUTTON */}

          <div className="flex gap-5 mt-10">
            <Link
              to="/login"
              className="
              group
              relative
              overflow-hidden
              rounded-xl
              bg-[#DEE33E]
              px-8
              py-4
              font-bold
              transition-all
              duration-300
              hover:scale-105
              active:scale-95
              hover:shadow-[0_15px_40px_rgba(222,227,62,.45)]
              "
            >
              <span className="relative z-20">Book Service</span>

              <div
                className="
                absolute
                left-0
                top-0
                h-full
                w-0
                bg-black
                transition-all
                duration-500
                group-hover:w-full
                "
              />

              <span
                className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                text-white
                opacity-0
                transition-all
                duration-500
                group-hover:opacity-100
                z-30
                "
              >
                Book Service →
              </span>
            </Link>

            <a
              href="#services"
              className="
                rounded-xl
                border-2
                border-gray-300
                px-8
                py-4
                font-semibold
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#DEE33E]
                hover:text-[#9FA324]
                hover:shadow-xl
              "
            >
              Explore Services
            </a>
          </div>

          {/* STATS */}

          <div className="mt-16 flex gap-14">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold"
              >
                2500+
              </motion.h2>

              <p className="mt-2 text-gray-500">Happy Customers</p>
            </div>

            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl font-bold"
              >
                1200+
              </motion.h2>

              <p className="mt-2 text-gray-500">Cars Repaired</p>
            </div>

            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-4xl font-bold"
              >
                12
              </motion.h2>

              <p className="mt-2 text-gray-500">Mechanics</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          className="relative flex justify-center items-center"
          variants={fadeRight}
          initial="hidden"
          animate="visible"
        >
          {/* Glow */}

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute w-[620px] h-[620px] rounded-full bg-[#DEE33E]/20 blur-3xl"
          />

          {/* CAR */}

          <motion.img
            src={carImage}
            alt="Car"
            variants={floating}
            animate="animate"
            whileHover={{
              scale: 1.05,
              rotate: -2,
            }}
            transition={{
              duration: 0.4,
            }}
            className="relative z-20 w-full max-w-[720px] drop-shadow-[0_35px_60px_rgba(0,0,0,.28)]"
          />

          {/* Rating */}

          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute left-0 top-12 z-30 rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl px-6 py-5"
          >
            <p className="text-sm text-gray-500">Customer Rating</p>

            <h2 className="mt-2 text-3xl font-bold">⭐ 4.9 / 5</h2>

            <p className="mt-2 text-sm text-gray-500">
              Based on 1,800+ Reviews
            </p>
          </motion.div>

          {/* Completed */}

          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute right-0 bottom-10 z-30 rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl px-6 py-5"
          >
            <p className="text-sm text-gray-500">Completed Repairs</p>

            <h2 className="mt-2 text-3xl font-bold text-[#9FA324]">1200+</h2>

            <p className="mt-2 text-sm text-gray-500">This Year</p>
          </motion.div>

          {/* Experience */}

          <motion.div
            animate={{
              x: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute -bottom-8 left-20 z-30 rounded-2xl bg-black text-white px-5 py-4 shadow-xl"
          >
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Experience
            </p>

            <h2 className="text-2xl font-bold mt-1">10+ Years</h2>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll */}

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-8 h-14 rounded-full border-2 border-gray-400 flex justify-center">
          <motion.div
            animate={{
              y: [0, 18, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="mt-2 h-2 w-2 rounded-full bg-[#DEE33E]"
          />
        </div>
      </motion.div>
    </section>
  );
}
