// Verificação imediata
console.log('main.js carregado, SimuladorFluxoCaixa disponível?', !!window.SimuladorFluxoCaixa);
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, SimuladorFluxoCaixa disponível?', !!window.SimuladorFluxoCaixa);
});

// Substituir todo o conteúdo relacionado ao DemoVersionManager em js/main.js
// Adicionar no início do arquivo, após as outras importações

// Gerenciamento de recursos da versão demo
window.DemoVersionManager = {
    // Modificar em js/main.js, dentro do objeto DemoVersionManager.init()
// Modificar em js/main.js, dentro do objeto DemoVersionManager.init()
init: function() {
    // Inicializar limitações da versão demo
    this.setupDemoLimitations();
    // Inicializar eventos do modal de upgrade
    this.setupUpgradeModal();
    // Adicionar notificações de limitação
    this.setupNotifications();
    // Adicionar esta nova linha para limitar acesso às abas adicionais
    this.limitPremiumTabs();
},

    setupDemoLimitations: function() {
        console.log('Configurando limitações da versão demo');
        // Limitar anos de projeção
        const dataFinalInput = document.getElementById('data-final');
        const dataInicialInput = document.getElementById('data-inicial');
        
        if (dataFinalInput && dataInicialInput) {
            // Forçar data final igual à inicial
            dataFinalInput.setAttribute('readonly', 'readonly');
            dataFinalInput.style.backgroundColor = '#f0f0f0';
            dataFinalInput.style.cursor = 'not-allowed';
            
            // Sincronizar data final com a inicial
            dataInicialInput.addEventListener('change', function() {
                dataFinalInput.value = this.value;
            });
            
            // Bloquear tentativas de edição
            dataFinalInput.addEventListener('click', function(e) {
                e.preventDefault();
                window.DemoVersionManager.showUpgradeModal('A simulação multi-anual está disponível apenas na versão completa');
            });
        }

        // Limitar exportação
        const btnExportarExcel = document.getElementById('btn-exportar-excel');
        if (btnExportarExcel) {
            btnExportarExcel.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.DemoVersionManager.showUpgradeModal('A exportação para Excel está disponível apenas na versão completa');
                return false;
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
        console.log('Configurando limitação de setores');
        // Lista de setores permitidos na demo
        const allowedSectors = ['comercio', 'industria', 'servicos'];
        
        // Aplicar limitação ao dropdown de setores
        const sectorSelect = document.getElementById('setor');
        if (sectorSelect) {
            // Processar opções existentes
            const options = sectorSelect.querySelectorAll('option');
            options.forEach(option => {
                if (option.value && !allowedSectors.includes(option.value)) {
                    option.disabled = true;
                    option.text = option.text + ' (Versão Completa)';
                }
            });
            
            // Observar carregamento futuro
            const observer = new MutationObserver(function(mutations) {
                const newOptions = sectorSelect.querySelectorAll('option:not([disabled])');
                newOptions.forEach(option => {
                    if (option.value && !allowedSectors.includes(option.value)) {
                        option.disabled = true;
                        option.text = option.text + ' (Versão Completa)';
                    }
                });
            });
            
            observer.observe(sectorSelect, { childList: true });
        }
    },

    limitMitigationStrategies: function() {
        console.log('Configurando limitação de estratégias');
        // Estratégias permitidas na demo
        const allowedStrategies = ['ajuste-precos', 'renegociacao-prazos'];
        
        // Bloquear abas de estratégias não permitidas
        setTimeout(() => {
            const strategyTabs = document.querySelectorAll('.strategy-tab-button');
            strategyTabs.forEach(tab => {
                const tabId = tab.getAttribute('data-strategy-tab');
                if (tabId && !allowedStrategies.includes(tabId)) {
                    tab.classList.add('disabled');
                    tab.setAttribute('disabled', 'disabled');
                    tab.innerHTML += ' <span class="demo-tag">Versão Completa</span>';
                    
                    tab.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        window.DemoVersionManager.showUpgradeModal('A estratégia ' + 
                            tab.textContent.replace(' Versão Completa', '') + 
                            ' está disponível apenas na versão completa');
                        return false;
                    });
                    
                    // Ocultar conteúdo da aba
                    const tabContent = document.querySelector(`.strategy-tab-content[data-strategy-tab="${tabId}"]`);
                    if (tabContent) {
                        tabContent.style.display = 'none';
                    }
                }
            });
        }, 500);
    },

    limitCalculationMemory: function() {
        console.log('Configurando limitação de memória de cálculo');
        // Limitar acesso à aba de memória de cálculo
        const memoryTab = document.querySelector('.tab-button[data-tab="memoria"]');
        if (memoryTab) {
            memoryTab.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.DemoVersionManager.showUpgradeModal('A memória de cálculo detalhada está disponível apenas na versão completa');
                return false;
            });

            // Adicionar indicador visual
            memoryTab.innerHTML += ' <small class="premium-tag">Premium</small>';
        }
    },

    setupUpgradeModal: function() {
        console.log('Configurando modal de upgrade');
        const modal = document.getElementById('modal-upgrade');
        const btnUpgrade = document.getElementById('btn-upgrade');
        
        if (!modal || !btnUpgrade) {
            console.error('Modal de upgrade não encontrado. Criando elementos...');
            this.createUpgradeElements();
            return;
        }
        
        // Abrir modal ao clicar no botão de upgrade
        btnUpgrade.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        });

        // Configurar fechamento do modal
        const closeBtns = modal.querySelectorAll('.close, .close-modal');
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
    
    createUpgradeElements: function() {
        console.log('Criando elementos para a versão demo');
        // Criar banner de versão demo
        const demoBanner = document.createElement('div');
        demoBanner.className = 'demo-banner';
        demoBanner.innerHTML = '<p>Versão de Demonstração - <a href="#" id="btn-upgrade" class="upgrade-button">Adquira a Versão Completa</a></p>';
        document.body.insertBefore(demoBanner, document.body.firstChild);
        
        // Criar modal de upgrade
        const modalHTML = `
            <div id="modal-upgrade" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Adquira a Versão Completa</h3>
                        <span class="close">×</span>
                    </div>
                    <div class="modal-body">
                        <h4>Recursos exclusivos da versão completa:</h4>
                        <ul class="feature-list">
                            <li><i class="feature-icon">✓</i> Simulação completa para todos os anos (2026-2033)</li>
                            <li><i class="feature-icon">✓</i> Acesso a todos os setores econômicos</li>
                            <li><i class="feature-icon">✓</i> 6 estratégias avançadas de mitigação</li>
                            <li><i class="feature-icon">✓</i> Exportação detalhada para Excel</li>
                            <li><i class="feature-icon">✓</i> Memória de cálculo completa</li>
                            <li><i class="feature-icon">✓</i> Combinação ótima de estratégias</li>
                            <li><i class="feature-icon">✓</i> Personalização de setores</li>
                        </ul>
                        <div class="pricing-info">
                            <p class="price">R$ 1.290,00</p>
                            <p class="price-detail">Licença anual com atualizações</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="https://www.expertzy.com.br/adquirir-simulador" class="btn-primary">Adquirir Agora</a>
                        <button class="btn-secondary close-modal">Voltar ao Simulador</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Adicionar estilos
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .demo-banner {
                background-color: #ff5722;
                color: white;
                text-align: center;
                padding: 8px 0;
                font-weight: bold;
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 9999;
            }

            .upgrade-button {
                background-color: white;
                color: #ff5722;
                padding: 4px 12px;
                border-radius: 4px;
                margin-left: 10px;
                text-decoration: none;
                font-weight: bold;
            }

            .upgrade-button:hover {
                background-color: #f0f0f0;
            }

            .container {
                margin-top: 36px;
            }

            .feature-list {
                list-style: none;
                padding: 0;
            }

            .feature-list li {
                margin-bottom: 12px;
                display: flex;
                align-items: center;
            }

            .feature-icon {
                color: #2ecc71;
                font-weight: bold;
                margin-right: 10px;
                font-style: normal;
            }

            .pricing-info {
                text-align: center;
                margin: 24px 0;
                padding: 15px;
                background-color: #f8f9fa;
                border-radius: 5px;
            }

            .price {
                font-size: 28px;
                font-weight: bold;
                color: #2c3e50;
                margin: 0;
            }

            .price-detail {
                color: #7f8c8d;
                margin: 5px 0 0 0;
            }

            .feature-blocked {
                opacity: 0.5;
                position: relative;
            }

            .feature-blocked::after {
                content: "Disponível na versão completa";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                border-radius: 5px;
            }
            
            .modal {
                display: none;
                position: fixed;
                z-index: 10000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.4);
            }

            .modal-content {
                background-color: #fefefe;
                margin: 10% auto;
                padding: 0;
                border: 1px solid #888;
                width: 80%;
                max-width: 600px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                border-radius: 8px;
            }

            .modal-header {
                padding: 15px 20px;
                background-color: #ff5722;
                color: white;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .modal-body {
                padding: 20px;
            }

            .modal-footer {
                padding: 15px 20px;
                background-color: #f8f9fa;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                text-align: right;
            }

            .close {
                color: white;
                float: right;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }

            .btn-primary {
                background-color: #ff5722;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
                text-decoration: none;
                display: inline-block;
            }

            .btn-secondary {
                background-color: #f0f0f0;
                color: #333;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                cursor: pointer;
                margin-left: 10px;
            }
            
            .premium-tag {
                background-color: #ff5722;
                color: white;
                padding: 2px 5px;
                border-radius: 3px;
                font-size: 10px;
                vertical-align: super;
            }

            .demo-tag {
                background-color: #7f8c8d;
                color: white;
                font-size: 10px;
                padding: 1px 4px;
                border-radius: 3px;
                margin-left: 5px;
            }
            
            .premium-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10;
                border-radius: 5px;
            }

            .premium-overlay span {
                color: white;
                font-weight: bold;
                background-color: #ff5722;
                padding: 8px 16px;
                border-radius: 4px;
            }

            .chart-container {
                position: relative;
            }
        `;
        document.head.appendChild(styleElement);
        
        // Configurar os novos elementos
        setTimeout(() => this.setupUpgradeModal(), 100);
    },

    showUpgradeModal: function(message) {
        console.log('Exibindo modal de upgrade com mensagem:', message);
        const modal = document.getElementById('modal-upgrade');
        
        if (!modal) {
            console.error('Modal de upgrade não encontrado');
            this.createUpgradeElements();
            setTimeout(() => this.showUpgradeModal(message), 200);
            return;
        }

        // Adicionar mensagem personalizada se fornecida
        if (message) {
            const messageEl = document.createElement('div');
            messageEl.className = 'upgrade-message';
            messageEl.textContent = message;

            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) {
                // Remover mensagem anterior se existir
                const existingMessage = modalBody.querySelector('.upgrade-message');
                if (existingMessage) {
                    modalBody.removeChild(existingMessage);
                }

                // Inserir nova mensagem no início
                modalBody.insertBefore(messageEl, modalBody.firstChild);
            }
        }

        modal.style.display = 'block';
    },

    setupNotifications: function() {
        console.log('Configurando notificações para recursos premium');
        // Adicionar notificações para recursos premium (gráficos)
        setTimeout(() => {
            const chartContainers = document.querySelectorAll('.chart-container');
            console.log('Containers de gráficos encontrados:', chartContainers.length);
            
            // Limitar a exibição de apenas 2 gráficos na demo
            chartContainers.forEach((container, index) => {
                if (index > 1) {
                    console.log('Bloqueando gráfico:', index);
                    container.classList.add('feature-blocked');
                    
                    // Adicionar overlay com mensagem
                    const overlay = document.createElement('div');
                    overlay.className = 'premium-overlay';
                    overlay.innerHTML = '<span>Disponível na versão completa</span>';
                    container.appendChild(overlay);
                    
                    container.addEventListener('click', function() {
                        window.DemoVersionManager.showUpgradeModal('Gráficos adicionais estão disponíveis na versão completa');
                    });
                }
            });
        }, 1000);
    },
    
    // Adicionar ao objeto DemoVersionManager no arquivo js/main.js
    limitPremiumTabs: function() {
        // Lista de abas que devem ser limitadas na versão demo (além da memória de cálculo que já está implementada)
        const premiumTabs = ['configuracoes', 'ajuda'];

        // Aplicar limitação às abas listadas
        premiumTabs.forEach(tabId => {
            const tabButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
            if (tabButton) {
                // Preservar o comportamento de navegação original para permitir a troca de abas
                const originalClickHandler = tabButton.onclick;

                // Substituir com novo manipulador de eventos
                tabButton.addEventListener('click', function(e) {
                    // Não prevenir o comportamento padrão completamente para permitir a navegação entre abas

                    // Executar o handler original primeiro para navegar para a aba
                    if (originalClickHandler) {
                        originalClickHandler.call(this, e);
                    } else {
                        // Caso não exista handler original, implementar navegação padrão
                        const tabId = this.getAttribute('data-tab');
                        const allTabs = document.querySelectorAll('.tab-content');
                        const allButtons = document.querySelectorAll('.tab-button');

                        // Ocultar todas as abas
                        allTabs.forEach(tab => tab.classList.remove('active'));
                        allButtons.forEach(btn => btn.classList.remove('active'));

                        // Exibir a aba selecionada
                        document.getElementById(`tab-${tabId}`).classList.add('active');
                        this.classList.add('active');
                    }

                    // Inserir banner de versão premium na aba após navegação
                    setTimeout(() => {
                        // Obter a aba atual
                        const tabContent = document.getElementById(`tab-${tabId}`);

                        // Verificar se o banner premium já existe
                        if (tabContent && !tabContent.querySelector('.feature-blocked')) {
                            // Armazenar o conteúdo original da aba (se ainda não armazenado)
                            if (!tabContent.originalContent) {
                                tabContent.originalContent = tabContent.innerHTML;
                            }

                            // Substituir todo o conteúdo da aba pelo banner premium
                            tabContent.innerHTML = `
                                <div class="feature-blocked" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.7); z-index: 1000;">
                                    <div style="text-align: center; color: white; padding: 20px; max-width: 80%;">
                                        <h2>Disponível na versão completa</h2>
                                        <p>Esta funcionalidade está disponível apenas na versão completa do simulador.</p>
                                        <button id="btn-premium-${tabId}" class="btn btn-primary" style="margin-top: 20px;">Adquirir Versão Completa</button>
                                    </div>
                                </div>
                            `;

                            // Adicionar evento ao botão de upgrade
                            setTimeout(() => {
                                const upgradeButton = document.getElementById(`btn-premium-${tabId}`);
                                if (upgradeButton) {
                                    upgradeButton.addEventListener('click', function() {
                                        DemoVersionManager.showUpgradeModal(`A aba ${tabButton.textContent.trim().replace('Premium', '')} está disponível apenas na versão completa`);
                                    });
                                }
                            }, 100);
                        }
                    }, 100);
                });

                // Adicionar indicador visual premium se ainda não existe
                if (!tabButton.innerHTML.includes('Premium')) {
                    tabButton.innerHTML += ' <small class="premium-tag">Premium</small>';
                }
            }
        });

        // Também aplicar o mesmo comportamento à aba "Memória de Cálculo" caso não esteja implementado
        const memoryTab = document.querySelector('.tab-button[data-tab="memoria"]');
        if (memoryTab && !memoryTab.limitApplied) {
            memoryTab.limitApplied = true; // Marcar que a limitação foi aplicada

            if (!memoryTab.innerHTML.includes('Premium')) {
                memoryTab.innerHTML += ' <small class="premium-tag">Premium</small>';
            }
        }
    }
};

// Garantir inicialização após carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando DemoVersionManager');
    setTimeout(() => {
        try {
            window.DemoVersionManager.init();
            console.log('DemoVersionManager inicializado com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar DemoVersionManager:', error);
        }
    }, 500);
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