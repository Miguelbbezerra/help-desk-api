import dayjs from "dayjs";

export class Validator {
    static validateData(data) {
        const inputDate = dayjs(data);
        const today = dayjs();
        const maxAge = 110;
        const earliestValidDate = today.subtract(maxAge, 'year');
    
        // Verifica se a data não ultrapassa o dia de hoje e se não é anterior à data mínima permitida
        return inputDate.isBefore(today, 'day') && inputDate.isAfter(earliestValidDate, 'day');
    }

    static validadeDataHoraAgendamento(dataHora){
        const inputDataHora = dayjs(dataHora)
        const today = dayjs()
        const now = dayjs('HH:mm:ss')

        return inputDataHora.isAfter(today, 'day') && inputDataHora.isAfter(now, 'minute')
    }

    static validateVazio(valor) {
        // Verifica se o valor é nulo, indefinido ou uma string vazia (após remover espaços em branco)
        return valor === null || valor === undefined || valor === '';
    }
    
    static validateEmail(email) {
        // Expressão regular para validar o formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePhoneNumber(phoneNumber) {
        // Expressão regular para validar o formato do número de telefone
        const phoneRegex = /^(\(\d{2}\))\s\d{5}-\d{4}$/;
        return phoneRegex.test(phoneNumber);
    }

    static validatePassword(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;
        return passwordRegex.test(password)
    }

    static validateCPF(cpf) {
        // Função para validar CPF
        function validateCPF(cpf) {
            cpf = cpf.replace(/[^\d]+/g,'');
            if(cpf == '') return false;
            // Elimina CPFs invalidos conhecidos
            if (cpf.length != 11 ||
                cpf == "00000000000" ||
                cpf == "11111111111" ||
                cpf == "22222222222" ||
                cpf == "33333333333" ||
                cpf == "44444444444" ||
                cpf == "55555555555" ||
                cpf == "66666666666" ||
                cpf == "77777777777" ||
                cpf == "88888888888" ||
                cpf == "99999999999")
                    return false;
            // Valida 1o digito
            let add = 0;
            for (let i=0; i < 9; i ++)
                add += parseInt(cpf.charAt(i)) * (10 - i);
            let rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(9)))
                return false;
            // Valida 2o digito
            add = 0;
            for (let i = 0; i < 10; i ++)
                add += parseInt(cpf.charAt(i)) * (11 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(10)))
                return false;
            return true;
        }

        return validateCPF(cpf);
    }
}