import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'

export default class ClientesController {


    public async index({}:HttpContextContract){

        const cliente = await Cliente.all()
        return cliente
    }

    public async show({params, response}:HttpContextContract){

        const cliente = (await Cliente.query()
        .with('planos', (builder) => { builder.select('*')})
        .with('cidades.estados', (builder) => { builder.select('*') })
        .where('id', params.id).first())

        if(!cliente) {
            return response.status(404).json({sucess: false, msg: "Cliente Não cadastrado",})
        }

        return response.status(200).json({success: true, data: cliente,})

    }

    public async store({request, response}: HttpContextContract){

        const body = request.only(['cpf', 'nome', 'telefone', 'endereco', 'data_contrato', 'data_cadastro', 'numero_contrato', 'cidade_id'])
        const cliente = await Cliente.create({
            cpf: body.cpf,
            nome: body.nome,
            telefone: body.telefone,
            endereco: body.endereco,
            data_contrato: body.data_contrato,
            data_cadastro: body.data_cadastro,
            numero_contrato: body.numero_contrato,
            cidade_id: body.cidade_id,
        })

        response.status(201)
        return cliente
    }

    public async update({request, response}: HttpContextContract){

        const clienteId = request.param('id')
        const body = request.only(['cpf', 'nome', 'telefone', 'endereco', 'data_contrato', 'data_cadastro', 'numero_contrato', 'cidade_id'])
        const cliente = await Cliente.findOrFail(clienteId)

        await cliente.merge(body).save()
        response.status(200)

        return cliente
    }

    public async destroy({request, response}: HttpContextContract){

        const clienteId = request.param('id')
        const cliente = await Cliente.findOrFail(clienteId)
        await cliente.delete()
        response.status(204)
    }
}