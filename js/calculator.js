let transactions = JSON.parse(localStorage.getItem("budgetData")) || [];

function saveData() {
    localStorage.setItem("budgetData", JSON.stringify(transactions));
}

function addTransaction() {
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    if (!description || isNaN(amount) || amount <= 0) {
        alert("Заполните описание и укажите сумму больше нуля");
        return;
    }

    transactions.push({
        id: Date.now(),
        type,
        description,
        amount
    });

    saveData();
    render();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("description").focus();
}

function deleteTransaction(id) {
    transactions = transactions.filter(item => item.id !== id);
    saveData();
    render();
}

function clearAll() {
    if (!transactions.length) return;

    if (confirm("Удалить все операции? Это действие нельзя отменить.")) {
        transactions = [];
        saveData();
        render();
    }
}

function render() {
    const table = document.getElementById("transactionTable");
    table.innerHTML = "";

    let income = 0;
    let expense = 0;

    if (!transactions.length) {
        table.innerHTML = `
            <tr class="empty-row">
                <td colspan="4">Пока нет операций. Добавьте первую!</td>
            </tr>
        `;
    }

    transactions.forEach(item => {
        if (item.type === "income") {
            income += item.amount;
        } else {
            expense += item.amount;
        }

        table.innerHTML += `
            <tr>
                <td>${item.type === "income" ? "💵 Доход" : "🛒 Расход"}</td>
                <td>${escapeHtml(item.description)}</td>
                <td>${item.amount.toLocaleString("ru-RU")} ₽</td>
                <td>
                    <button class="delete-btn" onclick="deleteTransaction(${item.id})">
                        Удалить
                    </button>
                </td>
            </tr>
        `;
    });

    const balance = income - expense;

    document.getElementById("totalIncome").textContent = income.toLocaleString("ru-RU") + " ₽";
    document.getElementById("totalExpense").textContent = expense.toLocaleString("ru-RU") + " ₽";
    document.getElementById("balance").textContent = balance.toLocaleString("ru-RU") + " ₽";

    let percent = 0;
    if (income > 0) {
        percent = ((expense / income) * 100).toFixed(1);
    }
    document.getElementById("expensePercent").textContent = percent + "%";
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

document.getElementById("amount").addEventListener("keydown", e => {
    if (e.key === "Enter") addTransaction();
});

document.getElementById("description").addEventListener("keydown", e => {
    if (e.key === "Enter") addTransaction();
});

render();
