'use strict'
window.addEventListener('DOMContentLoaded', () => {
	let students = []
	let promptMenu

	do {
		promptMenu = prompt(
			`1) Talaba qo‘shish
2) Talabani yangilash
3) Talabani o‘chirish
4) Talaba qidirish
5) Talabalar ro'yxati
6) Chiqish`
		)

		if (promptMenu === null || promptMenu.trim() === '') {
			alert("Iltimos to'g'ri ma'lumot kiriting")
			continue
		}

		promptMenu = +promptMenu

		// switch
		switch (promptMenu) {
			case 1:
				addStudent(alertStudent)
				break
			case 2:
				updateStudent()
				break
			case 3:
				deleteStudent()
				break
			case 4:
				searchStudent()
				break
			case 5:
				showStudent()
				break
			case 6:
				alert('Dasturdan muvaffaqiyatli chiqdingiz')
				break
			default:
				alert("Iltimos to'g'ri ma'lumot kiriting")
		}
	} while (promptMenu !== 6)

	// addStudent
	function addStudent(xabar) {
		let studentId = prompt('ID raqamingizni kiriting')
		const studentName = prompt('Ismingizni kiriting')
		let studentAge = prompt('Yoshingizni kiriting')
		const studentFaculty = prompt('Fakultetingizni kiriting')

		const allStudents = [studentId, studentName, studentAge, studentFaculty]
		const hasInvalid = allStudents.some(s => s.trim() === '' || s === null)

		if (hasInvalid) {
			alert("Iltimos to'gri ma'lumot kiriting")
			return
		}

		studentId = +studentId
		studentAge = +studentAge

		if (isNaN(studentId) || isNaN(studentAge)) {
			alert("ID va yosh qiymati raqam bo'lishi kerak")
			return
		}

		if (students.some(s => s.id === studentId)) {
			alert('Bu ID allaqachon mavjud')
			return
		}

		let student = {
			id: studentId,
			name: studentName,
			age: studentAge,
			faculty: studentFaculty,
		}

		students.push(student)
		xabar()
	}

	function alertStudent() {
		showStudent()
		alert("Talaba muvaffaqiyatli qo'shildi")
	}

	// showStudent
	function showStudent() {
		if (students.length === 0) {
			alert("Hozircha talabalar yo'q")
			return
		}

		console.clear()

		students.forEach(student => {
			let { id, name, age, faculty } = student
			console.log(`${id}) ${name} ${age} yosh - ${faculty} fakulteti talabasi`)
		})
	}

	// updateStudent
	function updateStudent() {
		const id = +prompt('Talabaning ID raqamini kiriting')
		const upStudent = prompt(`Qaysi qiymatni o'zgartirmoqchisiz?
1) name
2) age
3) faculty`)

		let field
		if (upStudent === '1') field = 'name'
		else if (upStudent === '2') field = 'age'
		else if (upStudent === '3') field = 'faculty'

		const newValue =
			field === 'age'
				? Number(prompt('Yangi yoshni kiritng'))
				: prompt(`Yangi ${field} ni kiriting`)

		let updated = false
		students = students.map(s => {
			if (s.id === id) {
				updated = true
				return { ...s, [field]: newValue }
			}
			return s
		})

		if (updated) {
			showStudent()
			alert("O'zgarishlar muvaffaqiyatli saqlandi")
		} else {
			alert('Xato: ID topilmadi')
		}
	}

	// deleteStudent
	function deleteStudent() {
		const id = Number(prompt('Talabaning ID raqamini kiriting'))

		let oldLength = students.length
		students = students.filter(s => s.id !== id)

		if (oldLength > students.length) {
			showStudent()
			alert("Talaba muvaffaqiyatli o'chirildi")
		} else {
			alert('Xato: ID topilmadi')
		}
	}

	// searchStudent
	function searchStudent() {
		const name = prompt('Talabaning ismini kiriting')
		if (name === null || name.trim() === '') {
			alert("Iltimos to'g'ri ma'lumot kiriting")
			return
		}

		const results = students.filter(s =>
			s.name.toLowerCase().includes(name.toLowerCase())
		)

		if (results.length > 0) {
			console.clear()
			results.forEach(result =>
				console.log(
					`${result.id}) ${result.name} ${result.age} yosh - ${result.faculty} fakulteti talabasi`
				)
			)
			alert('Talaba muvaffaqiyatli topildi')
		} else {
			alert('Xato: Bunday ismli talaba topilmadi')
		}
	}
})
