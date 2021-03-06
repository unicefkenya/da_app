
export class Classes{
    id:number
    class_name:string
    _class:string
    students:Student[]
    school:number
    selected:boolean
    next_class:any
    
}

export class PromoteStream{
    id:number
    next_class:number
    prev_class:number
    completed:boolean
    promote_school:number
}
export class Student{
    emis_code:number
    id:number
    fstname:string
    lstname:string
    mode_of_transport:string
    time_to_school:string
    stay_with:string
    meals_per_day:number
    household:number
    midname:string
    class_id:number
    date_of_birth:string
    gender:string
    student_name:string
    student_id:number
    status:boolean=false
    date_enrolled:string    
    guardian_name:string
    guardian_phone:string
    is_oosc:boolean

}
export class Teacher{
    id:number
  
    user:number
    fstname:string
    name:string
    classes:any
    lstname:string
    phone_no:string
    teacher_type:string
    birthday:string
    gender:string
    tsc_no:string
    bom_no:string
    headteacher:boolean
    qualifications:string
    subjects:any
    school:number
    date_started_teaching:string
    joined_current_school:string
    school_name:string
}
