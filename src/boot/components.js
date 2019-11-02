// import something here
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import Card from 'components/Card'
import Column from 'components/Column'
import Container from 'components/Container'
import Dialog from 'components/Dialog'
import DisplayHelper from 'components/DisplayHelper'
import Icon from 'components/Icon'
import List from 'components/List'
import ListItem from 'components/ListItem'
import Markdown from 'components/Markdown'
import Pic from 'components/Pic'
import PortalVue from 'portal-vue'
import Row from 'components/Row'
import Space from 'components/Space'

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.component('Avatar', Avatar)
  Vue.component('Button', Button)
  Vue.component('Card', Card)
  Vue.component('Column', Column)
  Vue.component('Container', Container)
  Vue.component('Dialog', Dialog)
  Vue.component('DisplayHelper', DisplayHelper)
  Vue.component('Icon', Icon)
  Vue.component('List', List)
  Vue.component('ListItem', ListItem)
  Vue.component('Markdown', Markdown)
  Vue.component('Pic', Pic)
  Vue.use(PortalVue)
  Vue.component('Row', Row)
  Vue.component('Space', Space)
}
