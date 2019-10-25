// import something here
import Button from 'components/Button'
import Card from 'components/Card'
import Column from 'components/Column'
import Container from 'components/Container'
import Icon from 'components/Icon'
import List from 'components/List'
import ListItem from 'components/ListItem'
import Pic from 'components/Pic'
import Row from 'components/Row'
import Markdown from 'components/Markdown'

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.component('Button', Button)
  Vue.component('Card', Card)
  Vue.component('Column', Column)
  Vue.component('Container', Container)
  Vue.component('Icon', Icon)
  Vue.component('List', List)
  Vue.component('ListItem', ListItem)
  Vue.component('Pic', Pic)
  Vue.component('Markdown', Markdown)
  Vue.component('Row', Row)
}
