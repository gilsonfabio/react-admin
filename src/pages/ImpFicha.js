import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useParams } from 'react-router-dom';
import MenBarra from '../components/MenBarra/MenBarra'; 

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import api from '../services/api';
import moment from 'moment';

const useStyles = makeStyles({
    buttonArea: {
        width: '100vw',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imprimir: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '200px',
    },

    button: {
      marginTop: '300px',
      color: '#fff',
      display: 'block',
      width: '260px',
      height: '45px',
      outline: 'none',
      fontSize: '18px',
      fontWeight: '400',
      borderRadius: '6px',
      cursor: 'pointer',
      flexWrap: 'wrap',
      backgroundColor: '#1f80e0',
      border: '2px solid #1f80e0',
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#1f80e0',
        backgroundColor: 'transparent',
      },
    },      

    filtros: {
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '200px',
        marginTop: '100px',
        backgroundColor: '#fff',        
    },
      
    input: {
        height: '100px',
        width: '30px',
        borderRadius: '6px',
        outline: 'none',
        padding: '15px',
        fontFamily: 'Poppins',
        transition: 'all 0.3s ease',
    },
});

function ImpFicha() {
    const classes = useStyles();
    const [user, setUser] = useState([]);

    const params = useParams();  

    const [datInicial, setDatInicial] = useState();
    const [datFinal, setDatFinal] = useState();

    const [usrNome, setUsrNome] = useState('');
    const [usrEmail,  setUsrEmail] = useState('');
    const [usrCelular,  setUsrCelular] = useState('');
    const [usrCpf,  setUsrCpf] = useState('');
    const [usrMatricula,  setUsrMatricula] = useState('');
    const [usrSecretaria,  setUsrSecretaria] = useState('');
    const [usrNascimento,  setUsrNascimento] = useState('');
    const [usrTipCadastro,  setUsrTipCadastro] = useState('');
    const [usrDatCadastro,  setUsrDatCadastro] = useState('');
    const [usrIdentidade,  setUsrIdentidade] = useState('');
    const [usrOrgEmissor,  setUsrOrgEmissor] = useState('');
    const [usrEstCivil,  setUsrEstCivil] = useState('');
    const [usrEndereco,  setUsrEndereco] = useState('');
    const [usrBairro,  setUsrBairro] = useState('');
    const [usrCidade,  setUsrCidade] = useState('');
    const [usrEstado,  setUsrEstado] = useState('');
    const [usrCep,  setUsrCep] = useState('');
    const [usrFonResid,  setUsrFonResid] = useState('');
    const [usrTrabalho,  setUsrTrabalho] = useState('');
    const [usrAdmissao,  setUsrAdmissao] = useState('');
    const [usrSalLiquido,  setUsrSalLiquido] = useState('');
    const [usrSalBruto,  setUsrSalBruto] = useState('');
    const [usrLimite,  setUsrLimite] = useState('');
    const [usrTipContrato,  setUsrTipContrato] = useState('');
    const [usrFonTrabalho,  setUsrFonTrabalho] = useState('');
    const [usrCargo, setUsrCargo] = useState('');
    const [usrConjuge, setUsrConjuge] = useState('');
    const [usrNasConjuge, setUsrNasConjuge] = useState('');
    const [usrObsBloqueio, setUsrObsBloqueio] = useState('');
    const [usrPai, setUsrPai] = useState('');
    const [usrMae, setUsrMae] = useState('');

    const [desSecretaria, setDesSecretaria] = useState('');
    const [desOrgao, setDesOrgao] = useState('');
    const [desCargo, setDesCargo] = useState('');
    const [desBairro, setDesBairro] = useState('');

    const [filhos, setFilhos] = useState([]);

    const [nomeUsr, setNomeUsr] = useState('');
    const [emailUsr, setEmailUsr] = useState('');
    const [salarioUsr, setSalarioUsr] = useState('');
    const [cadastroUsr, setCadastroUsr] = useState('');
    const [cpfUsr, setCpfUsr] = useState('');

    const [serNascimento, setSerNascimento] = useState('');
    const [conNascimento, setConNascimento] = useState('');
    const [cadEmissao ,setCadEmissao] = useState('');
    const [admissao ,setAdmissao] = useState('');

    const soma = 0;

    const arrayUsr = [];

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            text: `FICHA CADASTRAL DE FILIAÇÃO`,
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45],
        },
        {
            text: `DADOS PESSOAIS`,
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45],
        },

    ];

    const dadosUsr = [ 
            {text: 'Nome do Servidor(a):' + nomeUsr, text: 'email:' + emailUsr}, 
    ];


    const filhosUsr = filhos.map((fil) => {
        return [
            {text: fil.filId, fontSize: 8, margin: [0, 2, 0, 2] },
            {text: fil.filNome, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: fil.filNascimento, fontSize: 8, margin: [0, 2, 0, 2]}
        ]              
    });

    const details = [
        {
                style: 'tableExample',
                table: {
                    widths: ['100%'],
                    heights: [20],
                    body: [
                        [
                            { 
                                text: `Nome Servidor(a): ${nomeUsr}`,
                                fontSize: 14,
                                bold: true,
                            },             
                        ],
                    ],
                },
            },
            { 
                table: {
                    widths: ['70%', '30%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Email: ${emailUsr}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `Data Cadastro: `, alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['70%', '30%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Matricula: ${usrMatricula}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `CPF: ${cpfUsr}`, alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['70%', '30%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `RG: ${usrIdentidade} - ${usrOrgEmissor}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `Nascimento: ${usrNascimento}` ,alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['20%', '80%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Estado Civil: ${usrEstCivil}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `Conjuge: ${usrConjuge}`, alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['50%', '50%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Pai: ${usrPai}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `Mãe: ${usrMae}`, alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['100%'],
                    heights: [20],                    
                    body: [
                        [
                            { 
                                text: `Logradouro: ${usrEndereco}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['70%', '30%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Bairro: ${desBairro}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `CEP: ${usrCep}`, 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['70%', '30%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Cidade: ${usrCidade}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `Estado: ${usrEstado}`,  
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['50%', '50%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Telefone Residencial: ${usrFonResid}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `Celular: ${usrCelular}`, 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['50%', '50%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Tipo de Contrato: ${usrTipContrato}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `Tipo Cadastro: ${usrTipCadastro}`, 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['50%', '50%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Orgão Administrativo: ${desOrgao}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `Secretaria: ${desSecretaria}`, 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['50%', '50%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Cargo: ${desCargo}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                                                          
                            { 
                                text: `Local Trabalho: ${usrTrabalho}`, 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },            
            { 
                table: {
                    widths: ['50%', '50%'],
                    heights: [20,20],                    
                    body: [
                        [
                            { 
                                text: `Telefone Trabalho: ${usrFonTrabalho}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                            { 
                                text: `Data Admissão: ${usrAdmissao}`, 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['25%', '25%', '25%', '25%'],
                    heights: [20,20,20,20],                    
                    body: [
                        [
                            { 
                                text: `Salario Bruto:`+ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(usrSalBruto), alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            },
                            { 
                                text: `Salario Base:`+ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(salarioUsr), alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            },
                            { 
                                text: `Salario Liquido:`+ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(usrSalLiquido) ,alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            },
                            { 
                                text: `Limite Crédito:`+ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(usrLimite) ,alignment: 'left', 
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true
                            },
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['100%'],
                    heights: [20],                    
                    body: [
                        [
                            { 
                                text: `DEPENDENTES`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,      
                                alignment: 'center',                          
                            },
                        ],
                    ],
                }
            },
            {
                table: {
                    heights: [20,20,20],
                    widths: ['10%', '70%', '20%'],
                    border:[true, false, true, false],
                    body: [
                        [
                            {
                                text: 'ID', 
                                fontSize: 9, 
                                border:[true, false, true, false]
                            },
                            {
                                text: 'Nome do Dependente', 
                                fontSize: 9, 
                                border:[true, false, true, false]
                            },
                            {
                                text: 'Nascimento', 
                                fontSize: 9, 
                                border:[true, false, true, false]
                            },
                        ],
                        ...filhosUsr,
                    ]
                }
            },
            { 
                table: {
                    widths: ['100%'],
                    heights: [20],                    
                    body: [
                        [
                            { 
                                text: `Observações ${usrObsBloqueio}`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['100%'],
                    heights: [10],                    
                    body: [
                        [
                            { 
                                text: `1. Anexar cópia dos seguintes documentos CPF, RG, Comprovante de endereço atualizado e Contracheque. `,
                                border:[true, false, true, false],
                                fontSize: 9,
                                bold: true,                                
                            },
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['100%'],
                    heights: [10],                    
                    body: [
                        [
                            { 
                                text: `2. Autorizo desconto em folha da contribuição sindical conforme estatuto do Sindicaldas.`,
                                border:[true, false, true, false],
                                fontSize: 9,
                                bold: true,                                
                            },
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['100%'],
                    heights: [10],                    
                    body: [
                        [
                            { 
                                text: `3. Participam dos benefícios oferecidos pelo Sindicaldas os filiados que estejam em dia com suas contribuições.`,
                                border:[true, false, true, false],
                                fontSize: 9,
                                bold: true,                                
                            },
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['100%'],
                    heights: [10],                    
                    body: [
                        [
                            { 
                                text: `4. Autorizo desconto da contribuição sindical mesmo estando de Licença Médica. `,
                                border:[true, false, true, false],
                                fontSize: 9,
                                bold: true,                                
                            },
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['100%'],
                    heights: [20],                    
                    body: [
                        [
                            { 
                                text: ` `,
                                border:[true, false, true, false],
                                fontSize: 9,
                                bold: true,                                
                            },
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['100%'],
                    heights: [20],                    
                    body: [
                        [
                            { 
                                text: `Caldas Novas, ______ de __________________________ de 20 ___________`,
                                border:[true, false, true, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                        ],
                    ],
                }
            },           
            { 
                table: {
                    widths: ['100%'],
                    heights: [20],                    
                    body: [
                        [
                            { 
                                text: ` `,
                                border:[false, false, false, false],
                                fontSize: 9,
                                bold: true,                                
                            },
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['50%'],
                    heights: [20],                    
                    body: [
                        [
                            { 
                                text: ``,
                                border:[false, false, false, true],
                                fontSize: 9,
                                bold: true,                                
                            },
                        ],
                    ],
                }
            },
            { 
                table: {
                    widths: ['50%'],
                    heights: [20],                    
                    body: [
                        [
                            { 
                                text: `Servidor`,
                                border:[false, false, false, false],
                                fontSize: 9,
                                bold: true, 
                                alignment: 'center',                               
                            },
                        ],
                    ],
                }
            },
    ];

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content:[details],
    };

    useEffect(() => {
        let idUsr = params.usrId;    
        api.get(`searchUser/${idUsr}`).then(response => {
            setUser(response.data);
            setNomeUsr(response.data[0].usrNome);
            setEmailUsr(response.data[0].usrEmail);
            setSalarioUsr(response.data[0].usrSalBruto);
            setCadastroUsr(response.data[0].usrDatCadastro);    
            setCpfUsr(response.data[0].usrCpf);    
            
            setUsrNome(response.data[0].usrNome);
            setUsrEmail(response.data[0].usrEmail);
            setUsrCelular(response.data[0].usrCelular);
            setUsrCpf(response.data[0].usrCpf);
            setUsrMatricula(response.data[0].usrMatricula);
            setUsrSecretaria(response.data[0].usrSecretaria);
            setUsrNascimento(response.data[0].usrNascimento);
            setUsrTipCadastro(response.data[0].usrTipCadastro);
            setUsrDatCadastro(response.data[0].usrDatCadastro);
            setUsrIdentidade(response.data[0].usrIdentidade);
            setUsrOrgEmissor(response.data[0].usrOrgEmissor);
            setUsrEstCivil(response.data[0].usrEstCivil);
            setUsrEndereco(response.data[0].usrEndereco);
            setUsrBairro(response.data[0].usrBairro);
            setUsrCidade(response.data[0].usrCidade);
            setUsrEstado(response.data[0].usrEstado);
            setUsrCep(response.data[0].usrCep);
            setUsrFonResid(response.data[0].usrFonResid);
            setUsrTrabalho(response.data[0].usrTrabalho);
            setUsrAdmissao(response.data[0].usrAdmissao);
            setUsrSalLiquido(response.data[0].usrSalLiquido);
            setUsrSalBruto(response.data[0].usrSalBruto);
            setUsrTipContrato(response.data[0].usrTipContrato);
            setUsrFonTrabalho(response.data[0].usrFonTrabalho);
            setUsrCargo(response.data[0].usrCargo);
            setUsrConjuge(response.data[0].usrConjuge);
            setUsrNasConjuge(response.data[0].usrNasConjuge);
            setUsrObsBloqueio(response.data[0].usrObsBloqueio);
            setUsrPai(response.data[0].usrPai);
            setUsrMae(response.data[0].usrMae);
                         
            setDesSecretaria(response.data[0].secDescricao);
            setDesOrgao(response.data[0].orgDescricao);
            setDesCargo(response.data[0].crgDescricao);
            setDesBairro(response.data[0].baiDescricao);
             
            let lmtCredito = ((response.data[0].usrSalLiquido * 30) / 100);
            setUsrLimite(lmtCredito);
            
            //setSerNascimento(moment(usrNascimento).format('DD-MM-YYYY'));
            //setConNascimento(moment(response.data[0].usrNasConjuge).format('L'));
            //setCadEmissao(moment(response.data[0].usrDatCadastro).format('L'));
            //setAdmissao(moment(response.data[0].usrAdmissao).format('L'));
        })
        
        api.get(`filiacao/${idUsr}`).then(response => {
            setFilhos(response.data);
            
        })
        
    },[]);
       
    function emitePdf() { 

        for (let i = 0; i < user.length; i++) {
            
        }
        pdfMake.createPdf(docDefinition).open(); 
    };

    return (
        <div>
            <MenBarra />
            <div className={classes.imprimir}>
                <button className={classes.button} type="button" onClick={() => emitePdf()}>
                    <PictureAsPdfIcon /> Abrir PDF
                </button>
            </div>             
        </div>
    );
}

export default ImpFicha;