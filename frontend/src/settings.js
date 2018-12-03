import _ from 'lodash'

import defaultArgs from '../../shared/settings.default.json'
import sharedArgs from '../../shared/settings.shared.json'
import frontendArgs from '../settings.frontend.json'

const settings = _.merge(defaultArgs, sharedArgs, frontendArgs)

export default settings
