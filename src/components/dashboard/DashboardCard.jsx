import { motion } from "framer-motion";

function DashboardCard({
  title,
  value,
  color,
  icon
}) {

  return (

    <motion.div
      whileHover={{
        scale: 1.03
      }}
      className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
    >

      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-gray-500 text-lg">

            {title}

          </h3>

          <p
            className={`text-4xl font-bold mt-4 ${color}`}
          >

            {value}

          </p>

        </div>

        <div
          className={`text-5xl ${color}`}
        >

          {icon}

        </div>

      </div>

    </motion.div>

  );

}

export default DashboardCard;