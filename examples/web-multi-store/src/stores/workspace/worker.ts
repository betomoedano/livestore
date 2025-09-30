import { makeWorker } from '@livestore/adapter-web/worker'

import { workspaceSchema } from './schema.ts'

makeWorker({ schema: workspaceSchema })
