document.addEventListener("DOMContentLoaded", () => {
    const backdrop = document.getElementById("drawer-backdrop");
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.querySelector(".menu-btn");
    const drawer = document.getElementById("config-drawer");
    const modal = document.getElementById("delete-modal");

    const closeMobileSidebar = () => {
        if (sidebar) sidebar.classList.remove("active");
        if (backdrop && (!drawer || !drawer.classList.contains("open"))) {
            backdrop.classList.remove("active");
        }
    };

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (window.innerWidth < 768) {
                sidebar.classList.remove("collapsed");
                const isActive = sidebar.classList.toggle("active");
                if (backdrop) {
                    backdrop.classList.toggle("active", isActive);
                }
            } else {
                sidebar.classList.remove("active");
                if (backdrop) backdrop.classList.remove("active");
                sidebar.classList.toggle("collapsed");
            }
        });
    }

    if (sidebar) {
        sidebar.querySelectorAll("nav a").forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth < 768) {
                    closeMobileSidebar();
                }
            });
        });
    }

    const btnsDelete = document.querySelectorAll(".btn-delete"); 
    const btnCancelModal = document.getElementById("cancel-delete");
    const btnConfirmModal = document.getElementById("confirm-delete");
    const deleteServerLabel = document.getElementById("delete-server-label");

    let activeDeleteRow = null;

    btnsDelete.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (btn.disabled) return;
            const row = e.target.closest("tr");
            if (row) {
                activeDeleteRow = row;
                const instance = row.dataset.instance || "APP-PROD-01";
                const ip = row.dataset.ip || "192.168.1.10";
                if (deleteServerLabel) {
                    deleteServerLabel.textContent = `${instance} (${ip})`;
                }
            }
            if (modal) modal.showModal(); 
        });
    });

    if (btnCancelModal && modal) {
        btnCancelModal.addEventListener("click", () => {
            modal.close();
        });
    }

    if (btnConfirmModal && modal) {
        btnConfirmModal.addEventListener("click", () => {
            const serverName = deleteServerLabel ? deleteServerLabel.textContent : "Instancia";
            
            btnConfirmModal.classList.add("loading");
            btnConfirmModal.disabled = true;
            if (btnCancelModal) btnCancelModal.disabled = true;

            setTimeout(() => {
                btnConfirmModal.classList.remove("loading");
                btnConfirmModal.disabled = false;
                if (btnCancelModal) btnCancelModal.disabled = false;
                alert(`Instancia ${serverName} eliminada correctamente.`);
                modal.close();
            }, 1000);
        });
    }

    const btnsConfig = document.querySelectorAll(".btn-config"); 
    const btnCloseDrawer = document.getElementById("close-drawer");
    const btnCancelDrawer = document.getElementById("btn-cancel-drawer");
    const serverNameInput = document.getElementById("server-name");
    let isSavingConfig = false;

    const openDrawer = (instanceName) => {
        if (!drawer || isSavingConfig) return;
        if (serverNameInput && instanceName) {
            serverNameInput.value = instanceName;
        }
        drawer.classList.add("open");
        if (backdrop) backdrop.classList.add("active");
    };

    const closeDrawer = () => {
        if (!drawer || isSavingConfig) return;
        drawer.classList.remove("open");
        if (backdrop && !sidebar?.classList.contains("active")) {
            backdrop.classList.remove("active");
        }
    };

    btnsConfig.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (btn.disabled) return;
            const row = e.target.closest("tr");
            const instance = row ? row.dataset.instance : "APP-PROD-01";
            openDrawer(instance);
        });
    });

    if (btnCloseDrawer) {
        btnCloseDrawer.addEventListener("click", () => {
            if (!isSavingConfig) closeDrawer();
        });
    }

    if (btnCancelDrawer) {
        btnCancelDrawer.addEventListener("click", () => {
            if (!isSavingConfig) closeDrawer();
        });
    }

    if (backdrop) {
        backdrop.addEventListener("click", () => {
            if (isSavingConfig) return;
            closeDrawer();
            closeMobileSidebar();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (isSavingConfig) return;
            closeDrawer();
            closeMobileSidebar();
            if (modal && modal.open) modal.close();
        }
    });

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const themeText = document.getElementById("theme-text");

    if (themeToggle) {
        const updateButtonUI = (isDark) => {
            if (isDark) {
                if (themeIcon) themeIcon.textContent = "☀️";
                if (themeText) themeText.textContent = "Modo Claro";
            } else {
                if (themeIcon) themeIcon.textContent = "🌙";
                if (themeText) themeText.textContent = "Modo Oscuro";
            }
        };

        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let currentlyDark = document.body.classList.contains('dark-theme') || (isSystemDark && !document.body.classList.contains('light-theme'));
        updateButtonUI(currentlyDark);

        themeToggle.addEventListener("click", () => {
            if (document.body.classList.contains("dark-theme")) {
                document.body.classList.remove("dark-theme");
                document.body.classList.add("light-theme");
                currentlyDark = false;
            } else if (document.body.classList.contains("light-theme")) {
                document.body.classList.remove("light-theme");
                document.body.classList.add("dark-theme");
                currentlyDark = true;
            } else {
                if (isSystemDark) {
                    document.body.classList.add("light-theme");
                    currentlyDark = false;
                } else {
                    document.body.classList.add("dark-theme");
                    currentlyDark = true;
                }
            }
            updateButtonUI(currentlyDark);
        });
    }

    const formConfig = document.getElementById("config-form");
    const btnSave = document.getElementById("btn-save");

    if (formConfig && btnSave) {
        formConfig.addEventListener("submit", (e) => {
            e.preventDefault(); 
            
            isSavingConfig = true;

            btnSave.classList.add("loading");
            btnSave.disabled = true;

            if (btnCancelDrawer) {
                btnCancelDrawer.disabled = true;
                btnCancelDrawer.title = "Operación en progreso, espere un momento...";
            }

            if (btnCloseDrawer) {
                btnCloseDrawer.disabled = true;
            }
            formConfig.querySelectorAll("input, select").forEach(el => {
                el.disabled = true;
            });

            setTimeout(() => {
                btnSave.classList.remove("loading");
                btnSave.disabled = false;

                if (btnCancelDrawer) {
                    btnCancelDrawer.disabled = false;
                    btnCancelDrawer.removeAttribute("title");
                }

                if (btnCloseDrawer) {
                    btnCloseDrawer.disabled = false;
                }
                formConfig.querySelectorAll("input, select").forEach(el => {
                    el.disabled = false;
                });

                isSavingConfig = false;
                alert("Configuración guardada exitosamente.");
                closeDrawer(); 
            }, 2000);
        });
    }
});
