// Verificação imediata
console.log('main.js carregado, SimuladorFluxoCaixa disponível?', !!window.SimuladorFluxoCaixa);
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, SimuladorFluxoCaixa disponível?', !!window.SimuladorFluxoCaixa);
});

/**
 * Script principal do simulador de Split Payment
 * Inicializa todos os módulos e estabelece as relações entre eles
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando Simulador de Split Payment');
    
    // Inicializar gerenciador de setores
    if (typeof SetoresManager !== 'undefined') {
        SetoresManager.inicializar();
        
        // Preencher dropdown de setores na aba de simulação
        SetoresManager.preencherDropdownSetores('setor');
    }
    
    // Inicializar sistema de abas
    if (typeof TabsManager !== 'undefined') {
        TabsManager.inicializar();
    }
    
    // Inicializar gerenciador de formulários
    if (typeof FormsManager !== 'undefined') {
        FormsManager.inicializar();
    }
    
    // Inicializar gerenciador de modais
    if (typeof ModalManager !== 'undefined') {
        ModalManager.inicializar();
    }
    
    // Inicializar eventos específicos da página principal
    inicializarEventosPrincipais();
    
    // Adicionar observadores para mudanças de aba
    observarMudancasDeAba();
    
    console.log('Simulador de Split Payment inicializado com sucesso');
});

/**
 * Inicializa eventos específicos da página principal
 */
function inicializarEventosPrincipais() {
    console.log('Inicializando eventos principais');
    
    // Evento para o botão Simular
    const btnSimular = document.getElementById('btn-simular');
    if (btnSimular) {
        btnSimular.addEventListener('click', function() {
            console.log('Botão Simular clicado');

            // Verificação explícita da disponibilidade
            if (window.SimuladorFluxoCaixa && typeof window.SimuladorFluxoCaixa.simularImpacto === 'function') {
                // Chamada explícita usando window
                window.SimuladorFluxoCaixa.simularImpacto();
            } else {
                console.error('SimuladorFluxoCaixa não está definido corretamente', window.SimuladorFluxoCaixa);
                alert('Erro ao iniciar a simulação. Verifique o console para mais detalhes.');
            }
        });
    }
    
    // Eventos para exportação
    const btnExportarPDF = document.getElementById('btn-exportar-pdf');
    if (btnExportarPDF) {
        btnExportarPDF.addEventListener('click', function() {
            if (typeof ExportTools !== 'undefined') {
                ExportTools.exportarParaPDF();
            }
        });
    }
    
    const btnExportarExcel = document.getElementById('btn-exportar-excel');
    if (btnExportarExcel) {
        btnExportarExcel.addEventListener('click', function() {
            if (typeof ExportTools !== 'undefined') {
                ExportTools.exportarParaExcel();
            }
        });
    }
    
    const btnExportarMemoria = document.getElementById('btn-exportar-memoria');
    if (btnExportarMemoria) {
        btnExportarMemoria.addEventListener('click', function() {
            if (typeof ExportTools !== 'undefined') {
                ExportTools.exportarMemoriaCalculo();
            }
        });
    }
    
    // Eventos para exportação de estratégias
    const btnExportarEstrategiasPDF = document.getElementById('btn-exportar-estrategias-pdf');
    if (btnExportarEstrategiasPDF) {
        btnExportarEstrategiasPDF.addEventListener('click', function() {
            if (typeof ExportTools !== 'undefined') {
                ExportTools.exportarEstrategiasParaPDF();
            }
        });
    }

    const btnExportarEstrategiasExcel = document.getElementById('btn-exportar-estrategias-excel');
    if (btnExportarEstrategiasExcel) {
        btnExportarEstrategiasExcel.addEventListener('click', function() {
            if (typeof ExportTools !== 'undefined') {
                ExportTools.exportarEstrategiasParaExcel();
            }
        });
    }
    
    // Evento para atualização da memória de cálculo
    const btnAtualizarMemoria = document.getElementById('btn-atualizar-memoria');
    if (btnAtualizarMemoria) {
        btnAtualizarMemoria.addEventListener('click', function() {
            atualizarExibicaoMemoriaCalculo();
        });
    }
    
    // Evento para select de anos da memória
    const selectAnoMemoria = document.getElementById('select-ano-memoria');
    if (selectAnoMemoria) {
        selectAnoMemoria.addEventListener('change', function() {
            atualizarExibicaoMemoriaCalculo();
        });
    }
    
    // Função para atualizar exibição da memória de cálculo
    function atualizarExibicaoMemoriaCalculo() {
        const selectAno = document.getElementById('select-ano-memoria');
        if (!selectAno) return;
        
        const anoSelecionado = selectAno.value;
        console.log('Atualizando memória para o ano:', anoSelecionado);
        
        if (window.SimuladorFluxoCaixa && window.memoriaCalculoSimulacao) {
            window.SimuladorFluxoCaixa.exibirMemoriaCalculo(anoSelecionado);
        } else {
            console.error('Não há memória de cálculo disponível ou o simulador não está inicializado');
            document.getElementById('memoria-calculo').innerHTML = '<p>Realize uma simulação antes de visualizar a memória de cálculo.</p>';
        }
    }
    
    // Evento para simulação de estratégias
    const btnSimularEstrategias = document.getElementById('btn-simular-estrategias');
    if (btnSimularEstrategias) {
        btnSimularEstrategias.addEventListener('click', function() {
            simularEstrategias();
        });
    }
    
    // Adicionar evento para salvar setores que atualize os dropdowns
    const btnSalvarSetor = document.getElementById('btn-salvar-setor');
    if (btnSalvarSetor) {
        btnSalvarSetor.addEventListener('click', function() {
            // Após salvar o setor, atualizar dropdown na aba de simulação
            setTimeout(function() {
                SetoresManager.preencherDropdownSetores('setor');
            }, 100);
        });
    }
    
    // No final da função inicializarEventosPrincipais() no main.js
    // Adicionar:
    if (window.CurrencyFormatter) {
        CurrencyFormatter.inicializar();
    }
    
    console.log('Eventos principais inicializados');
}

/**
 * Observar mudanças de aba para atualizar dados quando necessário
 */
function observarMudancasDeAba() {
    // Observar eventos de mudança de aba
    document.addEventListener('tabChange', function(event) {
        const tabId = event.detail.tab;
        
        // Se a aba de simulação for ativada, garantir que o dropdown esteja atualizado
        if (tabId === 'simulacao') {
            SetoresManager.preencherDropdownSetores('setor');
            console.log('Dropdown de setores atualizado na aba de simulação');
        }
    });
}

// Adicionar na linha 103 (final do arquivo)
// Gerenciamento de recursos da versão demo
const DemoVersionManager = {
    init: function() {
        // Inicializar limitações da versão demo
        this.setupDemoLimitations();
        // Inicializar eventos do modal de upgrade
        this.setupUpgradeModal();
        // Adicionar notificações de limitação
        this.setupNotifications();
    },
    
    setupDemoLimitations: function() {
        // Limitar anos de projeção
        // Adicionar ao início da função DemoVersionManager.setupDemoLimitations em js/main.js
        // Garantir que o campo de data final não possa ser editado
        const dataFinalInput = document.getElementById('data-final');
        if (dataFinalInput) {
            // Definir o valor para o mesmo ano que a data inicial
            const dataInicialInput = document.getElementById('data-inicial');
            if (dataInicialInput && dataInicialInput.value) {
                dataFinalInput.value = dataInicialInput.value;
            }

            // Aplicar atributos para torná-lo não editável
            dataFinalInput.setAttribute('readonly', 'readonly');
            dataFinalInput.style.backgroundColor = '#f0f0f0';
            dataFinalInput.style.cursor = 'not-allowed';

            // Adicionar evento para manter o valor igual ao da data inicial
            dataInicialInput.addEventListener('change', function() {
                dataFinalInput.value = this.value;
            });

            // Adicionar evento para bloquear tentativas de edição
            dataFinalInput.addEventListener('click', function(e) {
                e.preventDefault();
                DemoVersionManager.showUpgradeModal('A simulação multi-anual está disponível apenas na versão completa');
            });
        }
        
        // Limitar exportação
        // Bloquear botão de exportação para Excel de forma mais direta
        const btnExportarExcel = document.getElementById('btn-exportar-excel');
        if (btnExportarExcel) {
            // Substituir o handler do evento click
            btnExportarExcel.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Clique no botão de exportação para Excel bloqueado');
                DemoVersionManager.showUpgradeModal('A exportação para Excel está disponível apenas na versão completa');
                return false;
            };

            // Adicionar classes visuais para indicar que está desativado
            btnExportarExcel.classList.add('disabled-premium');
            btnExportarExcel.innerHTML += ' <span class="premium-tag">Premium</span>';
        }
        
        // Limitar quantidade de setores disponíveis
        this.limitAvailableSectors();
        
        // Limitar estratégias de mitigação
        this.limitMitigationStrategies();
        
        // Limitar memória de cálculo
        this.limitCalculationMemory();
    },
    
    // Melhorar a função limitAvailableSectors em js/main.js
    limitAvailableSectors: function() {
        console.log('Configurando limitação de setores');

        // Lista de setores permitidos na demo (3-5 setores)
        const allowedSectors = ['comercio', 'industria', 'servicos'];

        // Aplicar limitação ao dropdown de setores
        setTimeout(function() {
            const sectorSelect = document.getElementById('setor');
            if (sectorSelect) {
                console.log('Dropdown de setores encontrado, aplicando limitações');

                // Processar todas as opções existentes
                const options = sectorSelect.querySelectorAll('option');
                options.forEach(option => {
                    if (option.value && !allowedSectors.includes(option.value)) {
                        console.log('Desabilitando setor:', option.value);
                        option.disabled = true;
                        option.text = option.text + ' (Versão Completa)';
                    }
                });

                // Observar mudanças futuras no dropdown (para casos de carregamento dinâmico)
                const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.type === 'childList') {
                            const newOptions = sectorSelect.querySelectorAll('option:not([disabled])');
                            newOptions.forEach(option => {
                                if (option.value && !allowedSectors.includes(option.value)) {
                                    console.log('Desabilitando novo setor:', option.value);
                                    option.disabled = true;
                                    option.text = option.text + ' (Versão Completa)';
                                }
                            });
                        }
                    });
                });

                observer.observe(sectorSelect, { childList: true, subtree: true });
            }
        }, 500);
    },

    // Melhorar a função limitMitigationStrategies em js/main.js
    limitMitigationStrategies: function() {
        console.log('Configurando limitação de estratégias');

        // Estratégias permitidas na demo
        const allowedStrategies = ['ajuste-precos', 'renegociacao-prazos'];

        // Aplicar bloqueio às estratégias não permitidas
        setTimeout(function() {
            // Bloquear abas de estratégias
            const strategyTabs = document.querySelectorAll('.strategy-tab-button');
            console.log('Abas de estratégias encontradas:', strategyTabs.length);

            strategyTabs.forEach(tab => {
                const tabId = tab.getAttribute('data-strategy-tab');
                if (tabId && !allowedStrategies.includes(tabId)) {
                    console.log('Desabilitando estratégia:', tabId);

                    // Desabilitar visualmente
                    tab.classList.add('disabled');
                    tab.setAttribute('disabled', 'disabled');

                    // Adicionar indicador visual
                    if (!tab.innerHTML.includes('Versão Completa')) {
                        tab.innerHTML += ' <span class="demo-tag">Versão Completa</span>';
                    }

                    // Substituir evento de clique
                    tab.onclick = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Clique em estratégia bloqueada:', tabId);
                        DemoVersionManager.showUpgradeModal('A estratégia ' + tab.textContent.replace(' Versão Completa', '') + ' está disponível apenas na versão completa');
                        return false;
                    };

                    // Ocultar o conteúdo da aba
                    const tabContent = document.querySelector('.strategy-tab-content[data-strategy-tab="' + tabId + '"]');
                    if (tabContent) {
                        tabContent.style.display = 'none';
                    }
                }
            });
        }, 1000);
    },
    
    limitCalculationMemory: function() {
        // Limitar acesso à aba de memória de cálculo
        const memoryTab = document.querySelector('.tab-button[data-tab="memoria"]');
        if (memoryTab) {
            memoryTab.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                DemoVersionManager.showUpgradeModal('A memória de cálculo detalhada está disponível apenas na versão completa');
            });
            
            // Adicionar indicador visual
            memoryTab.innerHTML += ' <small class="premium-tag">Premium</small>';
        }
    },
    
    setupUpgradeModal: function() {
        const modal = document.getElementById('modal-upgrade');
        const btnUpgrade = document.getElementById('btn-upgrade');
        const closeBtns = modal.querySelectorAll('.close, .close-modal');
        
        // Abrir modal ao clicar no botão de upgrade
        btnUpgrade.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        });
        
        // Fechar modal
        closeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        });
        
        // Fechar ao clicar fora
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    },
    
    showUpgradeModal: function(message) {
        const modal = document.getElementById('modal-upgrade');
        
        // Adicionar mensagem personalizada se fornecida
        if (message) {
            const messageEl = document.createElement('div');
            messageEl.className = 'upgrade-message';
            messageEl.textContent = message;
            
            const modalBody = modal.querySelector('.modal-body');
            
            // Remover mensagem anterior se existir
            const existingMessage = modalBody.querySelector('.upgrade-message');
            if (existingMessage) {
                modalBody.removeChild(existingMessage);
            }
            
            // Inserir nova mensagem no início
            modalBody.insertBefore(messageEl, modalBody.firstChild);
        }
        
        modal.style.display = 'block';
    },
    
    // Substituir a função setupNotifications em js/main.js
    setupNotifications: function() {
        console.log('Configurando notificações e limitações de gráficos');

        // Implementação mais robusta para limitar gráficos
        setTimeout(function() {
            // Selecionar todos os containers de gráficos
            const chartContainers = document.querySelectorAll('.chart-container');
            console.log('Containers de gráficos encontrados:', chartContainers.length);

            // Aplicar limitação apenas aos gráficos além dos 2 primeiros
            chartContainers.forEach((container, index) => {
                if (index > 1) {
                    console.log('Bloqueando gráfico:', index);

                    // Aplicar overlay de bloqueio
                    container.classList.add('feature-blocked');

                    // Desabilitar interatividade
                    const canvas = container.querySelector('canvas');
                    if (canvas) {
                        canvas.style.pointerEvents = 'none';
                        canvas.style.filter = 'blur(3px)';
                    }

                    // Adicionar overlay com mensagem
                    const overlay = document.createElement('div');
                    overlay.className = 'premium-overlay';
                    overlay.innerHTML = '<span>Disponível na versão completa</span>';
                    container.appendChild(overlay);

                    // Adicionar evento de clique para mostrar modal
                    container.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        DemoVersionManager.showUpgradeModal('Gráficos adicionais estão disponíveis na versão completa');
                    });
                }
            });
        }, 1000); // Delay para garantir que os gráficos já foram renderizados
    }
};

// Garantir que o DemoVersionManager seja inicializado corretamente
// Adicionar ao final do arquivo js/main.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando DemoVersionManager');
    
    // Verificar se o DemoVersionManager já existe
    if (typeof DemoVersionManager === 'undefined') {
        console.error('DemoVersionManager não encontrado, definindo agora');
        
        // Definir o objeto DemoVersionManager caso não exista
        window.DemoVersionManager = {
            // Funções existentes...
        };
    }
    
    // Inicializar o DemoVersionManager
    try {
        window.DemoVersionManager.init();
        console.log('DemoVersionManager inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar DemoVersionManager:', error);
    }
});