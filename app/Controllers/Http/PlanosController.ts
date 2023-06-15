import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plano from 'App/Models/Plano';

// import { HttpContext } from "@adonisjs/core/build/standalone";

export default class PlanosController {

    public async index({response}: HttpContextContract){
        const plano = Plano.all()
        response.status(200)
        return plano
    }

    public async store({request, response}: HttpContextContract){

        const body = request.only(['descricao', 'valor_mensalidade', 'cliente_id'])
        const plano = await Plano.create({
            descricao: body.descricao,
            valor_mensalidade: body.valor_mensalidade,
            cliente_id: body.cliente_id,
        })

        response.status(201)
        return plano
    }

    public async update({request, response}: HttpContextContract){
              
        const planoId = request.param('id')
        const body = request.only(['descricao', 'valor_mensalidade', 'cliente_id'])
        const plano = await Plano.findOrFail(planoId)
        await plano.merge(body).save()
        response.status(200)

        return plano
    }

    public async destroy({request, response}: HttpContextContract){
        const planoId = request.param('id')
        const plano = await Plano.findOrFail(planoId)
        await plano.delete()
        response.status(204)
    }
}