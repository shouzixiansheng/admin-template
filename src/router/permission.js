const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./part/', false, /\.js$/)
const partRoutes = requireAll(req)
export default [
  ...partRoutes
]
