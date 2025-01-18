// Implementation 1: Iterative approach
// Time: O(n) | Space: O(1)
function sum_to_n_a(n) {
  if (n < 0) return 0;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Implementation 2: Recursive approach
// Time: O(n) | Space: O(n)
function sum_to_n_b(n) {
  if (n < 0) return 0;
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_b(n - 1);
}

// Implementation 3: Formula-based approach
// Time: O(1) | Space: O(1)
function sum_to_n_c(n) {
  if (n < 0) return 0;
  return (n * (n + 1)) / 2;
}
