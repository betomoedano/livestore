import { makeWorker } from '@livestore/adapter-web/worker'

import { issueSchema } from './schema.ts'

makeWorker({ schema: issueSchema })
