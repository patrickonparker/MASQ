// import something here
import Column from 'components/Column';
import Container from 'components/Container';
import Row from 'components/Row';
import Text from 'components/Text';

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.component('Column', Column);
  Vue.component('Container', Container);
  Vue.component('Row', Row);
  Vue.component('Text', Text);
};
