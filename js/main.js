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
        const dataFinalInput = document.getElementById('data-final');
        if (dataFinalInput) {
            dataFinalInput.setAttribute('readonly', 'readonly');
            dataFinalInput.style.backgroundColor = '#f0f0f0';
            // Definir data final igual à inicial
            dataFinalInput.addEventListener('focus', function() {
                DemoVersionManager.showUpgradeModal('A simulação multi-anual está disponível apenas na versão completa');
            });
        }
        
        // Limitar exportação
        const btnExportarExcel = document.getElementById('btn-exportar-excel');
        if (btnExportarExcel) {
            btnExportarExcel.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                DemoVersionManager.showUpgradeModal('A exportação para Excel está disponível apenas na versão completa');
            });
        }
        
        // Limitar quantidade de setores disponíveis
        this.limitAvailableSectors();
        
        // Limitar estratégias de mitigação
        this.limitMitigationStrategies();
        
        // Limitar memória de cálculo
        this.limitCalculationMemory();
    },
    
    limitAvailableSectors: function() {
        // Lista de setores permitidos na demo
        const allowedSectors = ['comercio', 'industria', 'servicos', 'construcao', 'tecnologia'];
        
        // Aplicar limitação ao dropdown de setores
        const sectorSelect = document.getElementById('setor');
        if (sectorSelect) {
            // Observar carregamento do dropdown
            const observer = new MutationObserver(function(mutations) {
                const options = sectorSelect.querySelectorAll('option');
                
                // Processar apenas uma vez quando houver opções
                if (options.length > 1) {
                    options.forEach(option => {
                        if (option.value && !allowedSectors.includes(option.value)) {
                            option.disabled = true;
                            option.text = option.text + ' (Versão Completa)';
                        }
                    });
                    
                    observer.disconnect();
                }
            });
            
            observer.observe(sectorSelect, { childList: true });
        }
    },
    
    limitMitigationStrategies: function() {
        // Bloquear estratégias não disponíveis na demo
        document.addEventListener('DOMContentLoaded', function() {
            // Aguardar carregamento completo
            setTimeout(() => {
                // Estratégias permitidas na demo
                const allowedStrategies = ['ajuste-precos', 'renegociacao-prazos'];
                
                // Bloquear abas de estratégias não permitidas
                const strategyTabs = document.querySelectorAll('.strategy-tab-button');
                strategyTabs.forEach(tab => {
                    const tabId = tab.getAttribute('data-strategy-tab');
                    if (!allowedStrategies.includes(tabId)) {
                        tab.classList.add('disabled');
                        tab.setAttribute('disabled', 'disabled');
                        tab.innerHTML += ' <span class="demo-tag">Versão Completa</span>';
                        
                        tab.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            DemoVersionManager.showUpgradeModal('A estratégia ' + tab.textContent.replace(' Versão Completa', '') + ' está disponível apenas na versão completa');
                        });
                    }
                });
            }, 500);
        });
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
    
    setupNotifications: function() {
        // Adicionar notificações para recursos premium
        document.querySelectorAll('.chart-container').forEach((container, index) => {
            // Limitar a exibição de apenas 2 gráficos na demo
            if (index > 1) {
                container.classList.add('feature-blocked');
                container.addEventListener('click', function() {
                    DemoVersionManager.showUpgradeModal('Gráficos adicionais estão disponíveis na versão completa');
                });
            }
        });
    }
};

// Inicializar gerenciador da versão demo
document.addEventListener('DOMContentLoaded', function() {
    DemoVersionManager.init();
});