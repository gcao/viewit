require 'haml'
require 'erubis'

module Viewit
  def self.compile template
    Core.new template
  end
  
  class Core
    def initialize template
      @template = template
    end
  
    def apply model
      @model = model
      self
    end
  
    def render file = nil
      @compiled_template ||= Haml::Engine.new(@template)
      context = DataItem.create(@model)
      result = @compiled_template.render context 
    
      unless file.nil?
        File.open(file, "w") do |f|
          f.write result
        end
      end

      result
    end
  end
end

class Object
  def render_with_hash template, hash
    return 'TEMPLATE_NOT_DEFINED' if template.nil?
    Erubis::Eruby.new(template).result(hash)
  end
end
