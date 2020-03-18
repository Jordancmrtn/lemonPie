import { withStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
 const Loader = withStyles({
  root: {
    position : "absolute",
    top : "calc(50% - 20px)",
    left :  "calc(50% - 20px)",
    color: '#FFB534',
  },
})(CircularProgress);
export default Loader;