import Route from '@ember/routing/route';
import ResetScroll from '../../mixins/ResetScroll';

export default Route.extend(ResetScroll, {
  //When is this used??
	model: function(params) {
		return params;
	}
});
