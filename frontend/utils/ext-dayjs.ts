import localizedFormat from 'dayjs/plugin/localizedFormat'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

dayjs.extend(localizedFormat)
dayjs.locale('id')

export default dayjs