namespace :dev do
  ## attempt at not using foreman, come back to later
  # multitask :start => [:server, :client]
  #
  # desc "start rails server"
  # task :server do
  #   exec "rails s -p 3001"
  # end
  #
  # desc "start react client"
  # task :client do
  #   sh "cd ./client && npm run start"
  # end

  desc 'start dev server'
  task :start do
    # exec 'foreman start -f Procfile.dev'
    exec 'PORT=3001 rails s'
  end
end
