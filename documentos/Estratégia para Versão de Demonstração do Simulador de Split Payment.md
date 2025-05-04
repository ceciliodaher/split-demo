# Estratégia para Versão de Demonstração do Simulador de Split Payment

Após analisar detalhadamente o código do projeto de simulador de Split Payment, desenvolvi uma estratégia completa para criar uma versão de demonstração atrativa que incentive a aquisição da versão completa. Esta estratégia balanceia demonstrar valor suficiente para gerar interesse, mas reservando recursos premium para a versão paga.

## 1. Abordagem Estratégica

A versão de demonstração deve:

- Demonstrar o valor central do simulador sem comprometer recursos premium
- Fornecer resultados reais mas limitados
- Criar pontos de conversão claros
- Manter alta qualidade de experiência do usuário
- Permitir implantação rápida com alterações mínimas na base de código

## 2. Recursos a Limitar na Versão Demo

### 2.1. Limitações Funcionais Recomendadas

1. **Limitação Temporal**: Restrinja a simulação apenas para o ano inicial (2026)
2. **Setores Limitados**: Disponibilize apenas 3-5 setores para simulação (manter outros visíveis mas bloqueados)
3. **Estratégias de Mitigação**: Limite a 2 estratégias na versão demo (Ajuste de Preços e Renegociação de Prazos)
4. **Exportação Parcial**: Permita exportar apenas PDF simplificado (sem Excel e sem memória de cálculo)
5. **Gráficos Básicos**: Exiba apenas os gráficos essenciais (2 dos 5 disponíveis)
6. **Abas Limitadas**: Limitar o acesso somente às abas 'Simulação' e 'Estratégias de Mitigação'. Todas as demais serão um recurso premium.

### 2.2. Recursos Premium Exclusivos para Versão Completa

1. **Projeção multi-anual** (2026-2033)
2. **Acesso a todos os setores** com parâmetros específicos
3. **Todas as 6 estratégias de mitigação** com análise combinada
4. **Exportações avançadas** (Excel detalhado, memória de cálculo completa)
5. **Personalização de cenários** e parâmetros avançados
6. **Combinação ótima de estratégias** com inteligência analítica
7. **Biblioteca de setores personalizados**

## 3. Alterações Técnicas Específicas

A seguir, detalho exatamente as alterações necessárias em cada arquivo para implementar a versão demo:

### 3.1. Arquivo: `split-payment-simulator.html`

**Inserir banner de versão de demonstração no topo:**

```html
<!-- Adicionar antes da div "container" (linha 28) -->
<div class="demo-banner">
    <p>Versão de Demonstração - <a href="#" id="btn-upgrade" class="upgrade-button">Adquira a Versão Completa</a></p>
</div>
```

**Adicionar modal de upgrade:**

```html
<!-- Adicionar antes do fechamento do body (linha 890) -->
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
```

**Modificar CSS inline (adicionar na linha 821):**

```html
<style>
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
</style>
```

### 3.2. Arquivo: `js/main.js`

**Adicionar ao final do arquivo:**

```javascript
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
```

### 3.3. Arquivo: `js/simulation/simulator.js`

**Modificar a função `simular` para limitar a projeção:**

```javascript
// Substituir a função simular (a partir da linha 555)
simular: function(dados) {
    console.log('Iniciando simulação:', dados);

    // Versão demo: limitar para apenas o ano inicial
    const anoInicial = parseInt(dados.dataInicial.split('-')[0]);
    const anoFinal = anoInicial; // Limitar ao mesmo ano (apenas 2026 na demo)

    // Calcular impacto inicial
    const impactoBase = this.calcularImpactoCapitalGiro(dados, anoInicial);

    // Simular apenas o ano inicial na versão demo
    const projecaoTemporal = this.simularPeriodoTransicao(
        dados, 
        anoInicial, 
        anoFinal, 
        dados.cenario, 
        dados.taxaCrescimento
    );

    // Adicionar indicador de versão demo
    projecaoTemporal.demoVersion = true;
    projecaoTemporal.fullVersionMessage = "A simulação multi-anual (2026-2033) está disponível na versão completa.";

    // Armazenar memória de cálculo
    const memoriaCalculo = this.gerarMemoriaCalculo(dados, anoInicial, anoFinal);

    // Resultados completos
    const resultados = {
        impactoBase,
        projecaoTemporal,
        memoriaCalculo,
        demoVersion: true
    };

    console.log('Simulação concluída com sucesso:', resultados);

    return resultados;
},
```

**Modificar a função `exibirResultados` para adicionar CTA de upgrade:**

```javascript
// Modificar a função exibirResultados (a partir da linha 196)
// Adicionar no final antes de fechar a função (aproximadamente linha 380)

// Adicionar banner de versão demo nos resultados
if (resultados.demoVersion) {
    html += `
        <div class="result-card upgrade-card">
            <h3><i class="premium-icon">⭐</i> Acesse a análise completa</h3>
            <p>Esta versão de demonstração exibe apenas o impacto inicial (${projecao.parametros.anoInicial}).</p>
            <p>A versão completa inclui:</p>
            <ul>
                <li>Projeção completa até 2033</li>
                <li>Análise detalhada ano a ano</li>
                <li>Estratégias avançadas de mitigação</li>
                <li>Exportação em múltiplos formatos</li>
            </ul>
            <button id="btn-upgrade-results" class="btn btn-primary">Adquirir Versão Completa</button>
        </div>
    `;
}

// Adicionar evento ao botão de upgrade nos resultados
setTimeout(() => {
    const btnUpgradeResults = document.getElementById('btn-upgrade-results');
    if (btnUpgradeResults) {
        btnUpgradeResults.addEventListener('click', function() {
            const modal = document.getElementById('modal-upgrade');
            if (modal) modal.style.display = 'block';
        });
    }
}, 100);
```

### 3.4. Arquivo: `js/export/export-tools.js` (modificar `export-tools.js`)

**Modificar função de exportação para Excel para mostrar upgrade modal:**

```javascript
// Modificar função exportarParaExcel (a partir da linha 100)
exportarParaExcel: function() {
    // Na versão demo, mostrar modal de upgrade
    if (window.DemoVersionManager) {
        window.DemoVersionManager.showUpgradeModal('A exportação para Excel está disponível apenas na versão completa');
        return;
    }

    // Código original continua...
},
```

**Modificar função de exportação de memória de cálculo:**

```javascript
// Modificar função exportarMemoriaCalculo (a partir da linha 236)
exportarMemoriaCalculo: function() {
    // Na versão demo, mostrar modal de upgrade
    if (window.DemoVersionManager) {
        window.DemoVersionManager.showUpgradeModal('A exportação da memória de cálculo está disponível apenas na versão completa');
        return;
    }

    // Código original continua...
},
```

### 3.5. Arquivo: `css/main.css`

**Adicionar ao arquivo CSS (criar se não existir ou adicionar ao existente):**

```css
/* Estilos para versão demo */
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

.upgrade-card {
    border-left: 4px solid #ff5722;
    background-color: #fff8f6;
}

.upgrade-card h3 {
    color: #ff5722;
}

.premium-icon {
    color: #ff5722;
    margin-right: 5px;
    font-style: normal;
}

.upgrade-message {
    background-color: #ffe0d6;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    border-left: 4px solid #ff5722;
    color: #333;
}

.disabled {
    opacity: 0.6;
    cursor: not-allowed;
    position: relative;
}

.chart-container.feature-blocked canvas {
    filter: blur(3px);
}

/* Ajuste para botões desabilitados */
button:disabled, 
.tab-button.disabled,
.strategy-tab-button.disabled {
    cursor: not-allowed;
    opacity: 0.7;
}
```

## 4. Implementação da Estratégia de Conversão

### 4.1. Pontos de Conversão

A versão de demonstração terá múltiplos pontos de conversão estrategicamente posicionados:

1. **Banner Permanente**: No topo da página com CTA para adquirir a versão completa
2. **Modal de Upgrade**: Exibido quando o usuário tenta acessar recursos premium
3. **Resultados da Simulação**: CTA contextual após mostrar resultados iniciais
4. **Setores Limitados**: Opções desabilitadas no dropdown com indicador "Versão Completa"
5. **Estratégias Bloqueadas**: Abas de estratégias avançadas desabilitadas
6. **Gráficos Limitados**: Apenas 2 dos 5 gráficos são exibidos completamente

### 4.2. Mensagens de Conversão

As mensagens foram desenvolvidas para destacar o valor adicional da versão completa:

- "Acesse a análise completa e planeje-se para todo o período de transição (2026-2033)"
- "Desbloqueie todas as 6 estratégias de mitigação e encontre a combinação ideal"
- "Exporte relatórios detalhados em Excel para compartilhar com sua equipe"
- "Obtenha memória de cálculo completa para auditoria e documentação"

## 5. Considerações Adicionais

### 5.1. Deploy e Monitoramento

1. **Implementação Gradual**: Implemente as alterações em fases, começando pelo banner e modal principal
2. **Teste A/B**: Experimente diferentes mensagens e pontos de conversão
3. **Rastreamento de Conversão**: Adicione eventos de analytics para medir conversões
4. **Feedback**: Colete dados sobre quais recursos premium são mais procurados

### 5.2. Estratégia de Preço e Licenciamento

1. **Preço Atrativo**: R$ 1.290,00 para licença anual com acesso a todas as atualizações
2. **Desconto de Lançamento**: Ofereça 20% de desconto por tempo limitado
3. **Garantia**: Ofereça garantia de satisfação de 30 dias
4. **Suporte**: Inclua acesso ao suporte técnico na versão paga

## 6. Conclusão e Próximos Passos

A estratégia proposta para a versão de demonstração equilibra a demonstração de valor com a proteção dos recursos premium, criando múltiplos pontos de conversão naturais durante o uso do aplicativo. As modificações técnicas são focadas e minimamente invasivas ao código existente, facilitando a manutenção e atualização.

**Próximos passos recomendados:**

1. Implementar as alterações conforme definido neste documento
2. Configurar uma página de destino para capturar leads interessados na versão completa
3. Desenvolver material de marketing destacando os diferenciais da versão completa
4. Criar um sistema de licenciamento seguro para a versão paga
5. Implementar um processo de atualização automática para usuários da versão completa

Esta estratégia de demonstração posiciona o simulador como uma ferramenta valiosa para planejamento financeiro diante do Split Payment, enquanto reserva os recursos mais avançados para usuários que valorizam a análise completa.
