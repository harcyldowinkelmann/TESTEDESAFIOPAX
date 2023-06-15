import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Cidade from "App/Models/Cidade"
import Estado from 'App/Models/Estado'

export default class CidadesController {

    public async store({request, params, response}: HttpContextContract){

        const body = request.body()
        const estadoId = params.estadoId

        await Estado.findOrFail(estadoId)

        body.estadoId = estadoId

        const cidade = await Cidade.create(body)
        response.status(201)

        return {
            msg: "Cidade cadastrada",
            data: cidade,
        }

    }
}
