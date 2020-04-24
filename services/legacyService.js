
const legacyService = {}


legacyService.FormatPatientPayload = (payload) =>{
    return  {
        mensagem:"Paciente cadastrado com sucesso!",
        statusRetorno:"OK",
        possuiDados:true,
        objetoRetorno: {
            CLI_id: payload.patientid,
            CLI_dtNascimento: payload.dtNascimento,
            CLI_nome: payload.nome,
            CLI_Sexo: payload.sexo,
            CLI_tipoCliente: "PACIENTE",
            CLI_Convenio: payload.convenio,
            CLI_IdConvenio: payload.idConvenio
        }
    }

}

legacyService.FormatPatientPayloadError = (payload) =>{
    return {
        mensagem:"Erro ao cadastrar paciente!",
        statusRetorno:"Erro",
        possuiDados:false,
        objetoRetorno:{}
    }
}

module.exports = legacyService