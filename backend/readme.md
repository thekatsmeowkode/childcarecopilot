Database rationale
--------------------------------------
Depending on relationship types, data access patterns, and data conhesion, I will decide how to implement the data model.  This means I will decide to normalize or denormalize the data.  To normalize data, the related data would be referenced.  To denormalize data, the data would be embedded.  
An anti-pattern in MongoDB is Child Referencing, where the parent references its children.  Parent referencing is where we keep a reference tot he parent element in each child document.

The benefit of embedding the children (students) inside the parent (class) would be that the application would need fewer database queries, which increases performance.

Because each class will have less than 15 students, it makes sense to embed the students (children) directly into each class (parent).  Additionally, the data will not be updated much, but there will be a lot of reading.  This is a high read/write ratio.  This means we should embed the data, because by embedding we only need to access the database once per query.  Data referencing results in two accesses.  

In terms of data cohesion, or the measure of how much the data is related, the students are enrolled in each particular class.  The student data is very closely related to the classroom data.

This is a 1-M (few) relationship because one class can have many students, but a student cannot have more than 1 class.

