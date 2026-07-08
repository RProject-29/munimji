// Core financial math used across all calculators.
// Formulas follow standard Indian retail-finance conventions
// (monthly compounding for SIP/RD, annual compounding for FD).

/**
 * SIP future value.
 * FV = P * [ ((1+i)^n - 1) / i ] * (1+i)
 * where P = monthly investment, i = monthly rate, n = number of months.
 */
export function calculateSIP(monthlyInvestment, annualReturnPercent, years) {
  const i = annualReturnPercent / 100 / 12
  const n = years * 12
  if (i === 0) {
    const invested = monthlyInvestment * n
    return { investedAmount: invested, futureValue: invested, profit: 0 }
  }
  const futureValue =
    monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
  const investedAmount = monthlyInvestment * n
  const profit = futureValue - investedAmount
  return {
    investedAmount: round2(investedAmount),
    futureValue: round2(futureValue),
    profit: round2(profit),
  }
}

/**
 * Fixed Deposit maturity value, compounded quarterly (standard Indian bank convention).
 * A = P * (1 + r/4)^(4*t)
 */
export function calculateFD(principal, annualRatePercent, years) {
  const r = annualRatePercent / 100
  const n = 4 // quarterly compounding
  const maturityAmount = principal * Math.pow(1 + r / n, n * years)
  return {
    maturityAmount: round2(maturityAmount),
    interestEarned: round2(maturityAmount - principal),
  }
}

/**
 * Recurring Deposit maturity value (monthly compounding convention used by Indian banks).
 * M = P * n + P * i * n(n+1)/2 / 12   -- simplified approximation
 * Using more standard compound formula per instalment:
 */
export function calculateRD(monthlyDeposit, annualRatePercent, years) {
  const n = years * 12
  const i = annualRatePercent / 100 / 4 // quarterly compounding rate applied per RD convention
  let maturityValue = 0
  for (let month = 1; month <= n; month++) {
    const quartersRemaining = (n - month + 1) / 3
    maturityValue +=
      monthlyDeposit * Math.pow(1 + i, quartersRemaining)
  }
  const investedAmount = monthlyDeposit * n
  return {
    maturityValue: round2(maturityValue),
    investedAmount: round2(investedAmount),
    interestEarned: round2(maturityValue - investedAmount),
  }
}

/**
 * Goal planner — required monthly SIP to reach a target amount.
 * Solves the SIP formula for P given FV, i, n.
 */
export function calculateRequiredMonthlySavings(
  goalAmount,
  annualReturnPercent,
  years
) {
  const i = annualReturnPercent / 100 / 12
  const n = years * 12
  if (i === 0) {
    return round2(goalAmount / n)
  }
  const requiredMonthly =
    goalAmount / (((Math.pow(1 + i, n) - 1) / i) * (1 + i))
  return round2(requiredMonthly)
}

/**
 * Inflation-adjusted future purchasing power.
 * FV = PV * (1 + inflationRate)^years  -- this gives future cost of today's value.
 * Purchasing power of a fixed amount in the future = PV / (1+inflation)^years
 */
export function calculateFuturePurchasingPower(
  currentValue,
  inflationPercent,
  years
) {
  const futureCostOfSameGoods =
    currentValue * Math.pow(1 + inflationPercent / 100, years)
  const purchasingPowerErosion =
    currentValue / Math.pow(1 + inflationPercent / 100, years)
  return {
    futureCostOfSameGoods: round2(futureCostOfSameGoods),
    purchasingPowerErosion: round2(purchasingPowerErosion),
  }
}

/**
 * Wealth simulator — projects SIP value at multiple future ages.
 */
export function simulateWealthByAge(
  currentAge,
  monthlyInvestment,
  annualReturnPercent
) {
  const targetAges = [30, 40, 50, 60].filter((age) => age > currentAge)
  return targetAges.map((age) => {
    const years = age - currentAge
    const { futureValue } = calculateSIP(
      monthlyInvestment,
      annualReturnPercent,
      years
    )
    return { age, futureValue }
  })
}

function round2(num) {
  return Math.round(num * 100) / 100
}

export function formatINR(num) {
  if (num === null || num === undefined || isNaN(num)) return '₹0'
  return '₹' + Math.round(num).toLocaleString('en-IN')
}
