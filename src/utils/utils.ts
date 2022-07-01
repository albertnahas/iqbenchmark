import _ from "lodash"
import Highcharts from "highcharts"

export const multipleMax = (arr: any[], compare: string) => {
  var groups = _.groupBy(arr, compare)
  var keys = _.keys(groups)
  var max = _.max(keys) || ""
  return groups[max]
}

export const sameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth()
  )
}
export const isToday = (d: Date) => {
  const today = new Date()
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth()
  )
}

export const isiOS = () => {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  )
}

export const themeShadows: [
  "none",
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
] = [
  "none",
  "0px 2px 1px -1px rgba(0,0,0,0.12),0px 1px 1px 0px rgba(0,0,0,0.1),0px 1px 3px 0px rgba(0,0,0,00.07)",
  "0px 3px 1px -2px rgba(0,0,0,0.12),0px 2px 2px 0px rgba(0,0,0,0.1),0px 1px 5px 0px rgba(0,0,0,00.07)",
  "0px 3px 3px -2px rgba(0,0,0,0.12),0px 3px 4px 0px rgba(0,0,0,0.1),0px 1px 8px 0px rgba(0,0,0,00.07)",
  "0px 2px 4px -1px rgba(0,0,0,0.12),0px 4px 5px 0px rgba(0,0,0,0.1),0px 1px 10px 0px rgba(0,0,0,00.07)",
  "0px 3px 5px -1px rgba(0,0,0,0.12),0px 5px 8px 0px rgba(0,0,0,0.1),0px 1px 14px 0px rgba(0,0,0,00.07)",
  "0px 3px 5px -1px rgba(0,0,0,0.12),0px 6px 10px 0px rgba(0,0,0,0.1),0px 1px 18px 0px rgba(0,0,0,00.07)",
  "0px 4px 5px -2px rgba(0,0,0,0.12),0px 7px 10px 1px rgba(0,0,0,0.1),0px 2px 16px 1px rgba(0,0,0,00.07)",
  "0px 5px 5px -3px rgba(0,0,0,0.12),0px 8px 10px 1px rgba(0,0,0,0.1),0px 3px 14px 2px rgba(0,0,0,00.07)",
  "0px 5px 6px -3px rgba(0,0,0,0.12),0px 9px 12px 1px rgba(0,0,0,0.1),0px 3px 16px 2px rgba(0,0,0,00.07)",
  "0px 6px 6px -3px rgba(0,0,0,0.12),0px 10px 14px 1px rgba(0,0,0,0.1),0px 4px 18px 3px rgba(0,0,0,00.07)",
  "0px 6px 7px -4px rgba(0,0,0,0.12),0px 11px 15px 1px rgba(0,0,0,0.1),0px 4px 20px 3px rgba(0,0,0,00.07)",
  "0px 7px 8px -4px rgba(0,0,0,0.12),0px 12px 17px 2px rgba(0,0,0,0.1),0px 5px 22px 4px rgba(0,0,0,00.07)",
  "0px 7px 8px -4px rgba(0,0,0,0.12),0px 13px 19px 2px rgba(0,0,0,0.1),0px 5px 24px 4px rgba(0,0,0,00.07)",
  "0px 7px 9px -4px rgba(0,0,0,0.12),0px 14px 21px 2px rgba(0,0,0,0.1),0px 5px 26px 4px rgba(0,0,0,00.07)",
  "0px 8px 9px -5px rgba(0,0,0,0.12),0px 15px 22px 2px rgba(0,0,0,0.1),0px 6px 28px 5px rgba(0,0,0,00.07)",
  "0px 8px 10px -5px rgba(0,0,0,0.12),0px 16px 24px 2px rgba(0,0,0,0.1),0px 6px 30px 5px rgba(0,0,0,00.07)",
  "0px 8px 11px -5px rgba(0,0,0,0.12),0px 17px 26px 2px rgba(0,0,0,0.1),0px 6px 32px 5px rgba(0,0,0,00.07)",
  "0px 9px 11px -5px rgba(0,0,0,0.12),0px 18px 28px 2px rgba(0,0,0,0.1),0px 7px 34px 6px rgba(0,0,0,00.07)",
  "0px 9px 12px -6px rgba(0,0,0,0.12),0px 19px 29px 2px rgba(0,0,0,0.1),0px 7px 36px 6px rgba(0,0,0,00.07)",
  "0px 10px 13px -6px rgba(0,0,0,0.12),0px 20px 31px 3px rgba(0,0,0,0.1),0px 8px 38px 7px rgba(0,0,0,00.07)",
  "0px 10px 13px -6px rgba(0,0,0,0.12),0px 21px 33px 3px rgba(0,0,0,0.1),0px 8px 40px 7px rgba(0,0,0,00.07)",
  "0px 10px 14px -6px rgba(0,0,0,0.12),0px 22px 35px 3px rgba(0,0,0,0.1),0px 8px 42px 7px rgba(0,0,0,00.07)",
  "0px 11px 14px -7px rgba(0,0,0,0.12),0px 23px 36px 3px rgba(0,0,0,0.1),0px 9px 44px 8px rgba(0,0,0,00.07)",
  "0px 11px 15px -7px rgba(0,0,0,0.12),0px 24px 38px 3px rgba(0,0,0,0.1),0px 9px 46px 8px rgba(0,0,0,00.07)",
]

var data = [
  86, 80, 85, 90, 95, 85, 65, 98, 99, 101, 100, 97, 75, 55, 100, 100, 100, 86,
  80, 85, 90, 95, 85, 65, 98, 99, 101, 100, 97, 75, 55, 100, 100, 100, 86, 80,
  85, 90, 95, 85, 65, 98, 99, 101, 100, 97, 86, 80, 85, 90, 95, 85, 65, 98, 99,
  101, 100, 97, 75, 55, 100, 100, 100, 111, 107, 100, 107, 114, 115, 111, 97,
  100, 112, 104, 89, 104, 102, 91, 114, 114, 103, 106, 105, 113, 109, 108, 113,
  130, 128, 128, 118, 113, 130, 128, 128, 118, 113, 130, 128, 128, 118, 113,
  120, 132, 111, 124, 127, 128, 136, 106, 118, 119,
]

export const chartOptions = (result?: number): Highcharts.Options => {
  return {
    title: {
      text: "IQ Chart",
    },

    legend: {
      enabled: false,
    },

    xAxis: [
      {
        title: {
          text: "Data",
        },
        visible: false,
      },
      {
        title: {
          text: "IQ",
        },
        opposite: true,
        visible: true,
      },
    ],
    tooltip: {
      enabled: false,
    },

    yAxis: [
      {
        title: {
          text: "Data",
        },
        visible: false,
      },
      {
        title: {
          text: "IQ",
        },
        opposite: true,
        visible: false,
      },
    ],

    series: [
      {
        name: "IQ",
        type: "bellcurve",
        xAxis: 1,
        yAxis: 1,

        intervals: 4,
        baseSeries: 1,
        zIndex: -1,
        marker: {
          enabled: true,
        },

        zoneAxis: "x",
        zones: [
          { value: result || 0, color: "rgb(0, 102, 255, 0.6)" },
          {
            value: 70,
            color: "rgb(0, 102, 255, 0.1)",
          },
          {
            value: 85,
            color: "rgb(0, 102, 255, 0.2)",
          },
          {
            value: 100,
            color: "rgb(0, 102, 255, 0.3)",
          },
          {
            value: 115,
            color: "rgb(0, 102, 255, 0.4)",
          },
          {
            value: 125,
            color: "rgb(0, 102, 255, 0.3)",
          },
          {
            value: 140,
            color: "rgb(0, 102, 255, 0.2)",
          },
          {
            color: "rgb(0, 102, 255, 0.1)",
          },
        ],
      },
      {
        name: "Data",
        type: "scatter",
        data: data,
        visible: false,
        marker: {
          radius: 1.5,
        },
      },
    ],
  }
}
