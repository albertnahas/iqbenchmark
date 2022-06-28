/* eslint-disable no-mixed-operators */
// import { MedalType } from "../icons/Medal/Medal"

export const wikipediaURL =
  "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles="

const avatarURL = "https://avatars.dicebear.com/api/identicon/"

export const getAvatarURL = () => {
  const seed = Math.round(Math.random() * 99999)
  return `${avatarURL}${seed}.svg`
}

// export const gameEvals: {
//   medal: MedalType
//   message: string
//   color?: "primary" | "secondary" | "error" | "info" | "success" | "warning"
// }[] = [
//     { medal: "grey", message: "way to go", color: "error" },
//     { medal: "blue", message: "You still have a lot to learn", color: "warning" },
//     { medal: "silver", message: "You have a good knowledge!", color: "primary" },
//     { medal: "purple", message: "You are a polyglot!!", color: "primary" },
//     { medal: "gold", message: "You are unstoppable!!!", color: "success" },
//   ]

export const getTestPrice = (questions: number) => {
  switch (questions) {
    case 10:
      return 0
    case 11:
      return 0.99
    case 20:
      return 0.99
    case 40:
      return 2.99
    default:
      return 0
  }
}

export const getEval = (result: number) => {
  switch (true) {
    case result < 40:
      return "moderately imparied or delayed"
    case result < 55:
      return "mildly impaired or delayed"
    case result < 70:
      return "borderline impaired or delayed"
    case result < 80:
      return "low average"
    case result < 90:
      return "low average"
    case result < 110:
      return "average"
    case result < 120:
      return "high average"
    case result < 130:
      return "superior"
    case result < 145:
      return "very gifted or highly advanced"
    default:
      return "exceptionally gifted or genius"
  }
}

const normalcdf = (X: number) => {
  //HASTINGS.  MAX ERROR = .000001
  var T = 1 / (1 + 0.2316419 * Math.abs(X))
  var D = 0.3989423 * Math.exp((-X * X) / 2)
  var Prob =
    D *
    T *
    (0.3193815 +
      T * (-0.3565638 + T * (1.781478 + T * (-1.821256 + T * 1.330274))))
  if (X > 0) {
    Prob = 1 - Prob
  }
  return Prob
}

export const getPercentile = (score: number) => {
  const prob = normalcdf((score - 100) / 15)
  return Math.round(1000 * prob) / 10
}

// mulberry32
export const getRandomFromSeed = (a: number) => {
  var t = (a += 0x6d2b79f5)
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

export const getBrowserLocales = (options = {}) => {
  const defaultOptions = {
    languageCodeOnly: false,
  }
  const opt = {
    ...defaultOptions,
    ...options,
  }
  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages
  if (!browserLocales) {
    return undefined
  }
  return browserLocales.map((locale) => {
    const trimmedLocale = locale.trim()
    return opt.languageCodeOnly ? trimmedLocale.split(/-|_/)[0] : trimmedLocale
  })
}
