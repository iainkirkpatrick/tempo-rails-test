# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

iain = Person.create({ name: 'Iain' })
activity = Activity.create({ name: 'Building Tempo in Rails' })
Period.create({ person: iain, activity: activity, start_time: DateTime.new(2018, 1, 23, 9, 0, 0), end_time: DateTime.new(2018, 1, 23, 10, 0, 0) })
