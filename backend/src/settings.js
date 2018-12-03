import _ from 'lodash'

import defaultArgs from '../../shared/settings.default.json'
import sharedArgs from '../../shared/settings.shared.json'
import backendArgs from '../settings.backend.json'

const settings = _.merge(defaultArgs, sharedArgs, backendArgs)

export default settings
