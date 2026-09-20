/**
 * ============================================================================
 * ADAM MOHAMED - PORTFOLIO INTERACTIVITY (app.js)
 * Modern, Vanilla JavaScript with Clean Architecture
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initTheme();
  initNavigation();
  initSkillsFilter();
  initTodoSimulator();
  initContactForm();
  initCurrentYear();
});

/* --------------------------------------------------------------------------
   1. THEME MANAGER (Light / Dark Mode with Persistence)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const rootHtml = document.documentElement;

  // Retrieve saved preference or fallback to system preference
  const savedTheme = localStorage.getItem('am_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootHtml.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(newTheme === 'dark' ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️');
    });
  }

  function setTheme(theme) {
    rootHtml.setAttribute('data-theme', theme);
    localStorage.setItem('am_theme', theme);
  }
}

/* --------------------------------------------------------------------------
   2. NAVIGATION, MOBILE DRAWER & ACTIVE SCROLL SPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');

  // Mobile Menu Toggle
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenuBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });

    // Close when clicking outside header
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navMenu.classList.contains('open')) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  }

  // Back to Top button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Scroll Event for Active Section Spy & Header Elevation
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 120;

    // Header elevation
    if (window.scrollY > 20) {
      header.style.boxShadow = 'var(--shadow-md)';
    } else {
      header.style.boxShadow = 'none';
    }

    // Scroll spy for active navigation item
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. SKILLS MATRIX CATEGORY FILTER
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const categoryCards = document.querySelectorAll('.skill-category-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Set active tab
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      categoryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. INTERACTIVE FLUTTER TO-DO APP SIMULATOR (SQLite & setState Demo)
   -------------------------------------------------------------------------- */
function initTodoSimulator() {
  const todoForm = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const todoError = document.getElementById('todoError');
  const tasksList = document.getElementById('tasksList');
  const emptyState = document.getElementById('emptyState');
  const appbarCounter = document.getElementById('appbarCounter');
  const appSnackbar = document.getElementById('appSnackbar');
  const snackbarText = document.getElementById('snackbarText');
  const resetDemoBtn = document.getElementById('resetDemoBtn');
  const filterChips = document.querySelectorAll('.app-chip');
  const simTime = document.getElementById('simTime');

  // Default seed tasks representing Adam's Flutter developer workflow
  const defaultTasks = [
    { id: 1, title: 'Build responsive Flutter UI layout', isCompleted: true },
    { id: 2, title: 'Connect SQLite database helper', isCompleted: true },
    { id: 3, title: 'Implement setState() state management', isCompleted: false },
    { id: 4, title: 'Review Engineering track coursework', isCompleted: false }
  ];

  let currentFilter = 'all';
  let snackbarTimeout = null;

  // Load tasks from localStorage or seed with defaults
  let tasks = loadTasks();

  // Initialize clock in phone status bar
  updateSimulatorClock();
  setInterval(updateSimulatorClock, 30000);

  function updateSimulatorClock() {
    if (simTime) {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      simTime.textContent = `${hours}:${minutes}`;
    }
  }

  function loadTasks() {
    try {
      const saved = localStorage.getItem('am_todo_tasks');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not parse saved tasks', e);
    }
    return [...defaultTasks];
  }

  function saveTasks() {
    try {
      localStorage.setItem('am_todo_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.warn('Could not save tasks to localStorage', e);
    }
    renderTasks();
  }

  // Trigger simulated Flutter SnackBar
  function showSnackbar(message) {
    if (!appSnackbar || !snackbarText) return;
    snackbarText.textContent = message;
    appSnackbar.classList.add('show');
    clearTimeout(snackbarTimeout);
    snackbarTimeout = setTimeout(() => {
      appSnackbar.classList.remove('show');
    }, 2400);
  }

  // Add Task
  if (todoForm && todoInput) {
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = todoInput.value.trim();

      if (!title) {
        if (todoError) todoError.textContent = 'Please enter a task title!';
        todoInput.focus();
        return;
      }

      if (title.length < 2) {
        if (todoError) todoError.textContent = 'Task must be at least 2 characters.';
        return;
      }

      if (todoError) todoError.textContent = '';

      const newTask = {
        id: Date.now(),
        title: title,
        isCompleted: false
      };

      // Add to front (as standard in mobile apps)
      tasks.unshift(newTask);
      saveTasks();

      todoInput.value = '';
      showSnackbar('Task inserted to SQLite DB ✅');
    });

    // Clear validation error on type
    todoInput.addEventListener('input', () => {
      if (todoError) todoError.textContent = '';
    });
  }

  // Filter Chips (All / Active / Completed)
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      renderTasks();
    });
  });

  // Reset Demo button
  if (resetDemoBtn) {
    resetDemoBtn.addEventListener('click', () => {
      tasks = [
        { id: 1, title: 'Build responsive Flutter UI layout', isCompleted: true },
        { id: 2, title: 'Connect SQLite database helper', isCompleted: true },
        { id: 3, title: 'Implement setState() state management', isCompleted: false },
        { id: 4, title: 'Review Engineering track coursework', isCompleted: false }
      ];
      saveTasks();
      showSnackbar('Sample SQLite records restored 🔄');
    });
  }

  // Render Tasks List
  function renderTasks() {
    if (!tasksList) return;

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
      if (currentFilter === 'active') return !task.isCompleted;
      if (currentFilter === 'completed') return task.isCompleted;
      return true;
    });

    // Update remaining counter
    const activeCount = tasks.filter(t => !t.isCompleted).length;
    if (appbarCounter) {
      appbarCounter.textContent = `${activeCount} left`;
    }

    // Handle empty state
    if (filteredTasks.length === 0) {
      tasksList.innerHTML = '';
      if (emptyState) {
        emptyState.style.display = 'block';
        const emptySub = emptyState.querySelector('.empty-sub');
        if (emptySub) {
          if (currentFilter === 'completed') {
            emptySub.textContent = 'No completed tasks yet!';
          } else if (currentFilter === 'active') {
            emptySub.textContent = 'All tasks are completed!';
          } else {
            emptySub.textContent = 'Add a task above to get started';
          }
        }
      }
      return;
    }

    if (emptyState) {
      emptyState.style.display = 'none';
    }

    // Build DOM elements safely
    tasksList.innerHTML = '';
    filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-card ${task.isCompleted ? 'completed' : ''}`;
      li.setAttribute('data-id', task.id);

      // Task main content (checkbox + title)
      const taskMain = document.createElement('div');
      taskMain.className = 'task-main';

      const checkbox = document.createElement('button');
      checkbox.type = 'button';
      checkbox.className = 'custom-checkbox';
      checkbox.setAttribute('aria-label', task.isCompleted ? 'Mark as incomplete' : 'Mark as complete');
      checkbox.innerHTML = task.isCompleted 
        ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20 6 9 17 4 12"></polyline></svg>` 
        : '';

      const taskSpan = document.createElement('span');
      taskSpan.className = 'task-text';
      taskSpan.textContent = task.title;

      taskMain.appendChild(checkbox);
      taskMain.appendChild(taskSpan);

      // Task actions (Edit + Delete)
      const taskActions = document.createElement('div');
      taskActions.className = 'task-actions';

      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'task-btn edit-btn';
      editBtn.setAttribute('aria-label', 'Edit task');
      editBtn.title = 'Edit task';
      editBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'task-btn delete-btn';
      deleteBtn.setAttribute('aria-label', 'Delete task');
      deleteBtn.title = 'Delete task';
      deleteBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;

      taskActions.appendChild(editBtn);
      taskActions.appendChild(deleteBtn);

      li.appendChild(taskMain);
      li.appendChild(taskActions);

      // Event: Toggle status on checkbox or row click
      checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTask(task.id);
      });

      taskSpan.addEventListener('click', () => {
        toggleTask(task.id);
      });

      // Event: Edit task title
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        promptEditTask(task);
      });

      // Event: Delete task
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task.id);
      });

      tasksList.appendChild(li);
    });
  }

  function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted;
      saveTasks();
      showSnackbar(task.isCompleted ? 'Task marked completed 🎉' : 'Task marked active ⚡');
    }
  }

  function promptEditTask(task) {
    const newTitle = window.prompt('Edit task title:', task.title);
    if (newTitle !== null) {
      const trimmed = newTitle.trim();
      if (trimmed.length >= 2) {
        task.title = trimmed;
        saveTasks();
        showSnackbar('Task record updated (SQLite) ✏️');
      } else {
        showSnackbar('Error: Task title too short');
      }
    }
  }

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    showSnackbar('Task deleted from database 🗑️');
  }

  // Initial render
  renderTasks();
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM VALIDATION & SUBMISSION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const charCounter = document.getElementById('charCounter');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Character counter for message textarea
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charCounter.textContent = `${length} / 500`;
      if (length >= 480) {
        charCounter.style.color = '#EF4444';
      } else {
        charCounter.style.color = 'var(--text-muted)';
      }
    });
  }

  // Email format regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      const nameVal = nameInput.value.trim();
      if (!nameVal || nameVal.length < 2) {
        nameInput.classList.add('has-error');
        nameError.classList.add('show');
        isValid = false;
      } else {
        nameInput.classList.remove('has-error');
        nameError.classList.remove('show');
      }

      // Validate Email
      const emailVal = emailInput.value.trim();
      if (!emailVal || !emailRegex.test(emailVal)) {
        emailInput.classList.add('has-error');
        emailError.classList.add('show');
        isValid = false;
      } else {
        emailInput.classList.remove('has-error');
        emailError.classList.remove('show');
      }

      // Validate Message
      const messageVal = messageInput.value.trim();
      if (!messageVal || messageVal.length < 10) {
        messageInput.classList.add('has-error');
        messageError.classList.add('show');
        isValid = false;
      } else {
        messageInput.classList.remove('has-error');
        messageError.classList.remove('show');
      }

      if (!isValid) {
        return;
      }

      // Show submitting state
      const btnText = submitBtn.querySelector('.btn-text');
      const sendIcon = submitBtn.querySelector('.send-icon');
      const spinner = submitBtn.querySelector('.btn-spinner');

      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending...';
      if (sendIcon) sendIcon.style.display = 'none';
      if (spinner) spinner.style.display = 'inline-block';

      // Simulate network request
      setTimeout(() => {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        if (sendIcon) sendIcon.style.display = 'inline-block';
        if (spinner) spinner.style.display = 'none';

        // Display success banner
        if (formSuccess) {
          formSuccess.style.display = 'flex';
        }

        // Reset form inputs
        contactForm.reset();
        if (charCounter) charCounter.textContent = '0 / 500';

        showToast('Message sent! Thank you for reaching out, Adam will respond soon. 🚀');

        // Hide success banner after 8 seconds
        setTimeout(() => {
          if (formSuccess) formSuccess.style.display = 'none';
        }, 8000);
      }, 1200);
    });

    // Clear error on input
    nameInput.addEventListener('input', () => {
      nameInput.classList.remove('has-error');
      nameError.classList.remove('show');
    });

    emailInput.addEventListener('input', () => {
      emailInput.classList.remove('has-error');
      emailError.classList.remove('show');
    });

    messageInput.addEventListener('input', () => {
      messageInput.classList.remove('has-error');
      messageError.classList.remove('show');
    });
  }
}

/* --------------------------------------------------------------------------
   6. GLOBAL TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('portfolioToast');
  const toastMessage = document.getElementById('toastMessage');

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* --------------------------------------------------------------------------
   7. CURRENT YEAR
   -------------------------------------------------------------------------- */
function initCurrentYear() {
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
}
