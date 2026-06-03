import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const cardThemes = [
  {
    gradient: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
    ringColor: "ring-purple-200",
  },
  {
    gradient: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    ringColor: "ring-blue-200",
  },
  {
    gradient: "from-green-500 to-green-600",
    bgLight: "bg-green-50",
    ringColor: "ring-green-200",
  },
  {
    gradient: "from-purple-400 to-blue-500",
    bgLight: "bg-indigo-50",
    ringColor: "ring-indigo-200",
  },
  {
    gradient: "from-blue-400 to-green-500",
    bgLight: "bg-teal-50",
    ringColor: "ring-teal-200",
  },
  {
    gradient: "from-purple-600 to-blue-600",
    bgLight: "bg-violet-50",
    ringColor: "ring-violet-200",
  },
  {
    gradient: "from-blue-600 to-green-600",
    bgLight: "bg-cyan-50",
    ringColor: "ring-cyan-200",
  },
];

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statDescripiron,
  statIconName,
  index = 0,
}) {
  const theme = cardThemes[index % cardThemes.length];

  return (
    <div className="group animate-fade-in-up">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-2xl shadow-sm border border-gray-100 card-hover overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex-auto p-5">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`text-xl p-3.5 text-center inline-flex items-center justify-center min-w-14 rounded-2xl bg-gradient-to-br ${theme.gradient} shadow-lg shadow-purple-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
            >
              <FontAwesomeIcon icon={statIconName} color="white" className="z-50" />
            </div>
            {statPercent !== undefined && statPercent !== 0 && (
              <div className="flex items-center gap-1">
                <span className={`text-sm font-semibold ${
                  statArrow === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {statArrow === "up" ? "↑" : "↓"} {statPercent}%
                </span>
              </div>
            )}
          </div>
          <div className="relative w-full">
            <p className="text-gray-500 text-sm mb-1 font-medium">
              {statSubtitle}
            </p>
            <span className="text-2xl font-bold text-gray-800 block">
              {statTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

CardStats.propTypes = {
  statSubtitle: PropTypes.string.isRequired,
  statTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  statArrow: PropTypes.string,
  statPercent: PropTypes.number,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  index: PropTypes.number,
};

CardStats.defaultProps = {
  statTitle: "",
  statArrow: "",
  statPercent: 0,
  statDescripiron: "",
  statIconName: "default-icon",
  index: 0,
};
